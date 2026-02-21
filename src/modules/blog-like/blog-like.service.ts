import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import BlogLikeEntity from "./blog-like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/abstracts/base.service";

@Injectable()
class BlogLikeService extends BaseService<BlogLikeEntity> {
  constructor(
    @InjectRepository(BlogLikeEntity)
    blogLikeRepository: Repository<BlogLikeEntity>,
  ) {
    super(blogLikeRepository);
  }
}

export default BlogLikeService;
