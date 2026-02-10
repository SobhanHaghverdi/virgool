import CategoryService from "./category.service";
import { CreateCategoryDto } from "./dto/category.dto";
import { Controller, Post, Body } from "@nestjs/common";
import ResponseBuilder from "src/common/utils/response-builder";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";
import { ApiConsumes, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";

import {
  CategoryMessage,
  CategorySwaggerResponseMessage,
  CategorySwaggerOperationMessage,
} from "./category.message";

@Controller("categories")
class CategoryController {
  private readonly categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  @Post()
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  @ApiOperation({ summary: CategorySwaggerOperationMessage.Create })
  @ApiCreatedResponse({ description: CategorySwaggerResponseMessage.Created })
  async create(@Body() dto: CreateCategoryDto) {
    const category = await this.categoryService.create(dto);
    return ResponseBuilder.created(category, CategoryMessage.Created);
  }
}

export default CategoryController;
