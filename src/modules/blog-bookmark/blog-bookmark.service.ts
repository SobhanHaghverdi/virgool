import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BlogBookmarkEntity from "./blog-bookmark.entity";
import { BaseService } from "src/common/abstracts/base.service";

@Injectable()
class BlogBookmarkService extends BaseService<BlogBookmarkEntity> {
  constructor(
    @InjectRepository(BlogBookmarkEntity)
    blogBookmarkRepository: Repository<BlogBookmarkEntity>,
  ) {
    super(blogBookmarkRepository);
  }
}

export default BlogBookmarkService;
