import type { Request } from "express";
import BlogEntity from "./blog.entity";
import BlogService from "./blog.service";
import type { Id } from "src/common/types/entity.type";
import ApiAuth from "src/common/decorators/api-auth.decorator";
import ResponseBuilder from "src/common/utils/response-builder";
import { BlogMessage, BlogSwaggerMessage } from "./blog.message";
import ApiMessage from "src/common/decorators/api-message.decorator";
import type { ApiResponse } from "src/common/types/client-response.type";
import { CreateBlogDto, FilterBlogDto, UpdateBlogDto } from "./dto/blog.dto";

import {
  Req,
  Get,
  Body,
  Post,
  Param,
  Patch,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
} from "@nestjs/common";

@Controller("blogs")
class BlogController {
  private readonly blogService: BlogService;

  constructor(blogService: BlogService) {
    this.blogService = blogService;
  }

  @Get()
  @ApiMessage(BlogSwaggerMessage.Filter)
  async filter(@Query() query: FilterBlogDto): ApiResponse<object> {
    const blogs = await this.blogService.filter(query);
    return ResponseBuilder.ok(blogs);
  }

  @Get("my")
  @ApiAuth()
  @ApiMessage(BlogSwaggerMessage.Filter)
  async getMyBlogs(
    @Req() req: Request,
    @Query() query: FilterBlogDto,
  ): ApiResponse<object> {
    query.authorId = req.user!.userId;
    const blogs = await this.blogService.filter(query);

    return ResponseBuilder.ok(blogs);
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

  @ApiAuth()
  @Patch(":id")
  @ApiMessage(BlogSwaggerMessage.Update)
  async update(
    @Body() dto: UpdateBlogDto,
    @Param("id", ParseIntPipe) id: Id,
  ): ApiResponse<BlogEntity> {
    const blog = await this.blogService.update(id, dto);
    return ResponseBuilder.ok(blog, BlogMessage.Updated);
  }

  @ApiAuth()
  @Delete(":id")
  @ApiMessage(BlogSwaggerMessage.Delete)
  async delete(@Param("id", ParseIntPipe) id: Id): ApiResponse<null> {
    await this.blogService.deleteById(id);
    return ResponseBuilder.deleted();
  }
}

export default BlogController;
