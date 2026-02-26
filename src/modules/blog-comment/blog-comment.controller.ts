import type { Request } from "express";
import BlogCommentEntity from "./blog-comment.entity";
import type { Id } from "src/common/types/entity.type";
import BlogCommentService from "./blog-comment.service";
import ApiAuth from "src/common/decorators/api-auth.decorator";
import ResponseBuilder from "src/common/utils/response-builder";
import ApiMessage from "src/common/decorators/api-message.decorator";
import type { ApiResponse } from "src/common/types/client-response.type";

import {
  CreateBlogCommentDto,
  FilterBlogCommentDto,
  UpdateBlogCommentDto,
} from "./dto/blog-comment.dto";

import {
  BlogCommentMessage,
  BlogCommentSwaggerMessage,
} from "./blog-comment.message";

import {
  Get,
  Req,
  Body,
  Post,
  Param,
  Patch,
  Query,
  Controller,
  ParseIntPipe,
} from "@nestjs/common";

@Controller("blog-comments")
class BlogCommentController {
  private readonly blogCommentService: BlogCommentService;

  constructor(blogCommentService: BlogCommentService) {
    this.blogCommentService = blogCommentService;
  }

  @Get()
  @ApiAuth()
  @ApiMessage(BlogCommentSwaggerMessage.Filter)
  async filter(@Query() query: FilterBlogCommentDto): ApiResponse<object> {
    const blogComments = await this.blogCommentService.filter(query);
    return ResponseBuilder.ok(blogComments);
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

  @ApiAuth()
  @Patch(":id")
  @ApiMessage(BlogCommentSwaggerMessage.Update)
  async update(
    @Param("id", ParseIntPipe) id: Id,
    @Body() dto: UpdateBlogCommentDto,
  ): ApiResponse<BlogCommentEntity> {
    const blogComment = await this.blogCommentService.update(id, dto);
    return ResponseBuilder.ok(blogComment, BlogCommentMessage.Updated);
  }
}

export default BlogCommentController;
