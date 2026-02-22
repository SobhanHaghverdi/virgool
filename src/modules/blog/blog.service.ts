import { FindOptionsWhere, Repository } from "typeorm";
import BlogEntity from "./blog.entity";
import { BlogMessage } from "./blog.message";
import { InjectRepository } from "@nestjs/typeorm";
import type { CreateBlogDto, FilterBlogDto } from "./dto/blog.dto";
import type { Id } from "src/common/types/entity.type";
import { ConflictException, Injectable } from "@nestjs/common";
import StringHelper from "src/common/utils/string-helper.util";
import { BaseService } from "src/common/abstracts/base.service";
import { Pagination } from "src/common/utils/pagination.util";

@Injectable()
class BlogService extends BaseService<BlogEntity> {
  constructor(
    @InjectRepository(BlogEntity) blogRepository: Repository<BlogEntity>,
  ) {
    super(blogRepository);
  }

  async filter(query: FilterBlogDto) {
    const { authorId = undefined } = query;
    const conditions: FindOptionsWhere<BlogEntity> = {};

    const { limit, pageNumber, skip } = Pagination.solve(query);
    if (authorId) conditions.authorId = authorId;

    const [blogs, totalCount] = await this.repository.findAndCount({
      skip,
      take: limit,
      where: conditions,
      order: { id: "DESC" },
    });

    return {
      data: blogs,
      pagination: Pagination.generate(limit, pageNumber, totalCount),
    };
  }

  async create(authorId: Id, dto: CreateBlogDto) {
    const { title } = dto;
    const slug = StringHelper.createSlug(dto.slug ?? title);

    //* Check for duplicate title
    const doesTitleExists = await this.repository.existsBy({
      title: title.toLowerCase(),
    });

    if (doesTitleExists) {
      throw new ConflictException(BlogMessage.DuplicateTitle);
    }

    //* Check for duplicate slug
    const doesSlugExists = await this.repository.existsBy({
      slug: slug.toLowerCase(),
    });

    if (doesSlugExists) {
      throw new ConflictException(BlogMessage.DuplicateSlug);
    }

    return this.createEntity({ ...dto, authorId, slug });
  }
}

export default BlogService;
