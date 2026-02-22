import { Repository } from "typeorm";
import BlogEntity from "./blog.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/abstracts/base.service";

@Injectable()
class BlogService extends BaseService<BlogEntity> {
  constructor(
    @InjectRepository(BlogEntity) blogRepository: Repository<BlogEntity>,
  ) {
    super(blogRepository);
  }
}

export default BlogService;
