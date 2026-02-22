import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BlogCommentEntity from "./blog-comment.entity";
import { BaseService } from "src/common/abstracts/base.service";

@Injectable()
class BlogCommentService extends BaseService<BlogCommentEntity> {
  constructor(
    @InjectRepository(BlogCommentEntity)
    blogCommentRepository: Repository<BlogCommentEntity>,
  ) {
    super(blogCommentRepository);
  }
}

export default BlogCommentService;
