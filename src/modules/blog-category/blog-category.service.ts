import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BlogCategoryEntity from "./blog-category.entity";
import { BaseService } from "src/common/abstracts/base.service";

@Injectable()
class BlogCategoryService extends BaseService<BlogCategoryEntity> {
  constructor(
    @InjectRepository(BlogCategoryEntity)
    blogCategoryRepository: Repository<BlogCategoryEntity>,
  ) {
    super(blogCategoryRepository);
  }
}

export default BlogCategoryService;
