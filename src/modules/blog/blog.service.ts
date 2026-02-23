import BlogEntity from "./blog.entity";
import { BlogMessage } from "./blog.message";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id } from "src/common/types/entity.type";
import CategoryService from "../category/category.service";
import { FindOptionsWhere, Repository, Not } from "typeorm";
import { Pagination } from "src/common/utils/pagination.util";
import { ConflictException, Injectable } from "@nestjs/common";
import StringHelper from "src/common/utils/string-helper.util";
import { BaseService } from "src/common/abstracts/base.service";
import type { CreateBlogDto, FilterBlogDto } from "./dto/blog.dto";
import type { CreateCategoryDto } from "../category/dto/category.dto";
import BlogCategoryService from "../blog-category/blog-category.service";
import type { CreateBlogCategoryDto } from "../blog-category/dto/blog-category.dto";

@Injectable()
class BlogService extends BaseService<BlogEntity> {
  private readonly categoryService: CategoryService;
  private readonly blogCategoryService: BlogCategoryService;

  constructor(
    categoryService: CategoryService,
    blogCategoryService: BlogCategoryService,
    @InjectRepository(BlogEntity) blogRepository: Repository<BlogEntity>,
  ) {
    super(blogRepository);
    this.categoryService = categoryService;
    this.blogCategoryService = blogCategoryService;
  }

  async filter(query: FilterBlogDto) {
    let { search = undefined, authorId = undefined } = query;
    let conditions = "";

    const { limit, pageNumber, skip } = Pagination.solve(query);

    if (search) {
      search = `%${search}%`;

      conditions +=
        "CONCAT(blog.title, blog.shortDescription, blog.description, category.title) ILIKE :search";
    }

    if (authorId) {
      if (conditions.length > 0) conditions += " AND ";
      conditions += "blog.authorId= :authorId";
    }

    const [blogs, totalCount] = await this.repository
      .createQueryBuilder("blog")
      .leftJoin("blog.categories", "categories")
      .leftJoin("categories.category", "category")
      .addSelect(["categories.id", "category.title"])
      .where(conditions, { search, authorId })
      .orderBy("blog.id", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: blogs,
      pagination: Pagination.generate(limit, pageNumber, totalCount),
    };
  }

  async create(authorId: Id, dto: CreateBlogDto) {
    let { title, categories } = dto;
    dto.slug = StringHelper.createSlug(dto.slug ?? title);

    await this.validateFieldsForUpsert(dto);
    const blog = await this.createEntity({ ...dto, authorId, categories: [] });

    categories = categories.map((c) => c.trim().toLowerCase());
    const dbCategories = await this.categoryService.getAllByTitle(categories);

    //* Extract new categories
    const newCategories: CreateCategoryDto[] = categories
      .filter((c) => !dbCategories.some((dc) => dc.title === c))
      .map((c) => ({ title: c }));

    //* Create new categories
    const createdCategories =
      await this.categoryService.bulkCreate(newCategories);

    dbCategories.push(...createdCategories);

    //* Create new blog categories
    const newBlogCategories: CreateBlogCategoryDto[] = dbCategories.map(
      (c) => ({ blogId: blog.id, categoryId: c.id }),
    );

    await this.blogCategoryService.bulkCreate(newBlogCategories);
    return blog;
  }

  private async validateFieldsForUpsert(dto: CreateBlogDto, id: Id = 0) {
    const { title, slug = undefined } = dto;

    const fixedSlug = slug?.toLowerCase();
    const fixedTitle = title.toLowerCase();

    //* Check for duplicate title or slug
    const existing = await this.repository.findOne({
      where: [
        { slug: fixedSlug, id: Not(id) },
        { title: fixedTitle, id: Not(id) },
      ],
      select: ["title", "slug"],
    });

    if (existing) {
      if (existing.title === fixedTitle) {
        throw new ConflictException(BlogMessage.DuplicateTitle);
      }
      if (existing.slug === fixedSlug) {
        throw new ConflictException(BlogMessage.DuplicateSlug);
      }
    }
  }
}

export default BlogService;
