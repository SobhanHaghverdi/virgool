import type { Request } from "express";
import BlogCommentEntity from "./blog-comment.entity";
import BlogCommentService from "./blog-comment.service";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateBlogCommentDto } from "./dto/blog-comment.dto";
import ApiAuth from "src/common/decorators/api-auth.decorator";
import ResponseBuilder from "src/common/utils/response-builder";
import ApiMessage from "src/common/decorators/api-message.decorator";
import type { ApiResponse } from "src/common/types/client-response.type";

import {
  BlogCommentMessage,
  BlogCommentSwaggerMessage,
} from "./blog-comment.message";

@Controller("blog-comments")
class BlogCommentController {
  private readonly blogCommentService: BlogCommentService;

  constructor(blogCommentService: BlogCommentService) {
    this.blogCommentService = blogCommentService;
  }

  @Post()
  @ApiAuth()
  @ApiMessage(BlogCommentSwaggerMessage.Create)
  async create(
    @Req() req: Request,
    @Body() dto: CreateBlogCommentDto,
  ): ApiResponse<BlogCommentEntity> {
    const userId = req.user!.userId;
    const blogComment = await this.blogCommentService.create(userId, dto);

    return ResponseBuilder.created(blogComment, BlogCommentMessage.Created);
  }
}

export default BlogCommentController;
