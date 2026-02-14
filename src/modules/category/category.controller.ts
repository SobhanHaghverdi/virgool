import CategoryService from "./category.service";
import { CreateCategoryDto } from "./dto/category.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import ResponseBuilder from "src/common/utils/response-builder";
import { Controller, Post, Body, Get, Query } from "@nestjs/common";

import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";

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

  @Get()
  @ApiOperation({ summary: CategorySwaggerOperationMessage.Filter })
  @ApiOkResponse({ description: CategorySwaggerResponseMessage.Filter })
  async filter(@Query() paginationDto: PaginationDto) {
    const categories = await this.categoryService.filter(paginationDto);
    return ResponseBuilder.ok(categories);
  }

  @Post()
  @ApiOperation({ summary: CategorySwaggerOperationMessage.Create })
  @ApiCreatedResponse({ description: CategorySwaggerResponseMessage.Created })
  async create(@Body() dto: CreateCategoryDto) {
    const category = await this.categoryService.create(dto);
    return ResponseBuilder.created(category, CategoryMessage.Created);
  }
}

export default CategoryController;
