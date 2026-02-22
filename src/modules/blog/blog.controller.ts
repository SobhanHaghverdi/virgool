import type { Request } from "express";
import BlogEntity from "./blog.entity";
import BlogService from "./blog.service";
import { CreateBlogDto, FilterBlogDto } from "./dto/blog.dto";
import ApiAuth from "src/common/decorators/api-auth.decorator";
import ResponseBuilder from "src/common/utils/response-builder";
import { BlogMessage, BlogSwaggerMessage } from "./blog.message";
import ApiMessage from "src/common/decorators/api-message.decorator";
import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import type { ApiResponse } from "src/common/types/client-response.type";

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
}

export default BlogController;
