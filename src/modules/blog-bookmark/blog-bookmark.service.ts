import { Repository } from "typeorm";
import BlogService from "../blog/blog.service";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogMessage } from "../blog/blog.message";
import BlogBookmarkEntity from "./blog-bookmark.entity";
import type { Id } from "src/common/types/entity.type";
import { BaseService } from "src/common/abstracts/base.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
class BlogBookmarkService extends BaseService<BlogBookmarkEntity> {
  private readonly blogService: BlogService;

  constructor(
    blogService: BlogService,
    @InjectRepository(BlogBookmarkEntity)
    blogBookmarkRepository: Repository<BlogBookmarkEntity>,
  ) {
    super(blogBookmarkRepository);
    this.blogService = blogService;
  }

  async bookmarkToggle(userId: Id, blogId: Id) {
    const blog = await this.blogService.checkExistenceById(blogId);
    if (!blog) throw new NotFoundException(BlogMessage.NotFound);

    //* Delete bookmark if it exists
    const bookmark = await this.repository.findOneBy({ userId, blogId });
    if (bookmark) return this.repository.remove(bookmark);

    return this.createEntity({ userId, blogId });
  }
}

export default BlogBookmarkService;
