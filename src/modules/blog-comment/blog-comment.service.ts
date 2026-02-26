import { Repository } from "typeorm";
import BlogService from "../blog/blog.service";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogMessage } from "../blog/blog.message";
import BlogCommentEntity from "./blog-comment.entity";
import type { Id } from "src/common/types/entity.type";
import { BlogCommentMessage } from "./blog-comment.message";
import { Pagination } from "src/common/utils/pagination.util";
import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/common/abstracts/base.service";

import type {
  CreateBlogCommentDto,
  FilterBlogCommentDto,
  UpdateBlogCommentDto,
} from "./dto/blog-comment.dto";

@Injectable()
class BlogCommentService extends BaseService<BlogCommentEntity> {
  private readonly blogService: BlogService;

  constructor(
    blogService: BlogService,
    @InjectRepository(BlogCommentEntity)
    blogCommentRepository: Repository<BlogCommentEntity>,
  ) {
    super(blogCommentRepository);
    this.blogService = blogService;
  }

  async filter(query: FilterBlogCommentDto) {
    const { limit, pageNumber, skip } = Pagination.solve(query);

    const [comments, totalCount] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { id: "DESC" },
      relations: { blog: true, user: { profile: true } },
      select: {
        blog: { title: true },
        user: { userName: true, profile: { nickName: true } },
      },
    });

    return {
      data: comments,
      pagination: Pagination.generate(limit, pageNumber, totalCount),
    };
  }

  async create(userId: Id, dto: CreateBlogCommentDto) {
    const { blogId, parentId = undefined } = dto;

    const doesBlogExists = await this.blogService.checkExistenceById(blogId);
    if (!doesBlogExists) throw new NotFoundException(BlogMessage.NotFound);

    //* Check for parent existence
    if (parentId) {
      const doesParentExists = await this.repository.existsBy({ id: parentId });

      if (!doesParentExists) {
        throw new NotFoundException(BlogCommentMessage.NotFound);
      }
    }

    return this.createEntity({ ...dto, userId, isVerified: true });
  }

  async update(id: Id, dto: UpdateBlogCommentDto) {
    const comment = await this.repository.findOneBy({ id });
    if (!comment) throw new NotFoundException(BlogCommentMessage.NotFound);

    Object.assign(comment, dto);
    return this.saveChanges(comment);
  }
}

export default BlogCommentService;
