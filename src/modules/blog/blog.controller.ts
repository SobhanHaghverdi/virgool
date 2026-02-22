import type { Request } from "express";
import BlogEntity from "./blog.entity";
import BlogService from "./blog.service";
import { CreateBlogDto } from "./dto/blog.dto";
import { Body, Controller, Post, Req } from "@nestjs/common";
import ApiAuth from "src/common/decorators/api-auth.decorator";
import ResponseBuilder from "src/common/utils/response-builder";
import { BlogMessage, BlogSwaggerMessage } from "./blog.message";
import ApiMessage from "src/common/decorators/api-message.decorator";
import type { ApiResponse } from "src/common/types/client-response.type";

@Controller("blogs")
class BlogController {
  private readonly blogService: BlogService;

  constructor(blogService: BlogService) {
    this.blogService = blogService;
  }

  @Post()
  @ApiAuth()
  @ApiMessage(BlogSwaggerMessage.Create)
  async create(
    @Req() req: Request,
    @Body() dto: CreateBlogDto,
  ): ApiResponse<BlogEntity> {
    const userId = req.user!.userId;
    const blog = await this.blogService.create(userId, dto);

    return ResponseBuilder.ok(blog, BlogMessage.Created);
  }
}

export default BlogController;
