import { Repository } from "typeorm";
import BlogService from "../blog/blog.service";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogMessage } from "../blog/blog.message";
import BlogCommentEntity from "./blog-comment.entity";
import type { Id } from "src/common/types/entity.type";
import { BlogCommentMessage } from "./blog-comment.message";
import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/common/abstracts/base.service";
import type { CreateBlogCommentDto } from "./dto/blog-comment.dto";

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
}

export default BlogCommentService;
