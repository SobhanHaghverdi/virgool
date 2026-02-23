import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BlogCategoryEntity from "./blog-category.entity";
import { BaseService } from "src/common/abstracts/base.service";
import type { CreateBlogCategoryDto } from "./dto/blog-category.dto";

@Injectable()
class BlogCategoryService extends BaseService<BlogCategoryEntity> {
  constructor(
    @InjectRepository(BlogCategoryEntity)
    blogCategoryRepository: Repository<BlogCategoryEntity>,
  ) {
    super(blogCategoryRepository);
  }

  async bulkCreate(dtos: CreateBlogCategoryDto[]) {
    return this.bulkInsert(dtos);
  }
}

export default BlogCategoryService;
