import { Repository } from "typeorm";
import BlogService from "../blog/blog.service";
import BlogLikeEntity from "./blog-like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogMessage } from "../blog/blog.message";
import type { Id } from "src/common/types/entity.type";
import { BaseService } from "src/common/abstracts/base.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
class BlogLikeService extends BaseService<BlogLikeEntity> {
  private readonly blogService: BlogService;

  constructor(
    blogService: BlogService,
    @InjectRepository(BlogLikeEntity)
    blogLikeRepository: Repository<BlogLikeEntity>,
  ) {
    super(blogLikeRepository);
    this.blogService = blogService;
  }

  async likeToggle(userId: Id, blogId: Id) {
    const blog = await this.blogService.checkExistenceById(blogId);
    if (!blog) throw new NotFoundException(BlogMessage.NotFound);

    //* Delete like if it exists
    const like = await this.repository.findOneBy({ userId, blogId });
    if (like) return this.repository.remove(like);

    return this.createEntity({ userId, blogId });
  }
}

export default BlogLikeService;
