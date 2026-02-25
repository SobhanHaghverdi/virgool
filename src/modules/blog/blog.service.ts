import BlogEntity from "./blog.entity";
import { Repository, Not } from "typeorm";
import { BlogMessage } from "./blog.message";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id } from "src/common/types/entity.type";
import CategoryService from "../category/category.service";
import { Pagination } from "src/common/utils/pagination.util";
import StringHelper from "src/common/utils/string-helper.util";
import { BaseService } from "src/common/abstracts/base.service";
import type { CreateCategoryDto } from "../category/dto/category.dto";
import BlogCategoryService from "../blog-category/blog-category.service";
import type { CreateBlogCategoryDto } from "../blog-category/dto/blog-category.dto";

import type {
  CreateBlogDto,
  FilterBlogDto,
  UpdateBlogDto,
} from "./dto/blog.dto";

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";

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

  async checkExistenceById(id: Id) {
    return this.repository.existsBy({ id });
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
    const { title } = dto;
    dto.slug = StringHelper.createSlug(dto.slug ?? title);

    await this.validateFieldsForUpsert(dto);
    const blog = await this.createEntity({ ...dto, authorId, categories: [] });

    //* Create category and blog category relations
    await this.createBlogCategory(blog, dto);
    return blog;
  }

  async update(id: Id, dto: UpdateBlogDto) {
    const { title = undefined } = dto;

    let blog = await this.repository.findOneBy({ id });
    if (!blog) throw new NotFoundException(BlogMessage.NotFound);

    dto.slug = StringHelper.createSlug(dto.slug ?? title);
    await this.validateFieldsForUpsert(dto, id);

    //* Create category and blog category relations
    await this.createBlogCategory(blog, dto);
    delete dto.categories;

    Object.assign(blog, dto);
    return this.saveChanges(blog);
  }

  async deleteById(id: Id) {
    const blog = await this.repository.findOneBy({ id });
    if (!blog) throw new NotFoundException(BlogMessage.NotFound);

    return this.repository.remove(blog);
  }

  private async validateFieldsForUpsert(
    dto: CreateBlogDto | UpdateBlogDto,
    id: Id = 0,
  ) {
    const { title, slug = undefined } = dto;

    const fixedSlug = slug?.toLowerCase();
    const fixedTitle = title?.toLowerCase();

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

  private async createBlogCategory(
    blog: BlogEntity,
    dto: CreateBlogDto | UpdateBlogDto,
  ) {
    let { categories } = dto;

    if (categories) {
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

      await this.blogCategoryService.deleteManyByBlogId(blog.id);
      await this.blogCategoryService.bulkCreate(newBlogCategories);
    }
  }
}

export default BlogService;
