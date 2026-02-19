import CategoryService from "./category.service";
import type CategoryEntity from "./category.entity";
import type { Id } from "src/common/types/entity.type";
import { PaginationDto } from "src/common/dto/pagination.dto";
import ApiAuth from "src/common/decorators/api-auth.decorator";
import ResponseBuilder from "src/common/utils/response-builder";
import ApiMessage from "src/common/decorators/api-message.decorator";
import type { ApiResponse } from "src/common/types/client-response.type";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { CategoryMessage, CategorySwaggerMessage } from "./category.message";

import {
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
  Controller,
  ParseIntPipe,
} from "@nestjs/common";

@Controller("categories")
class CategoryController {
  private readonly categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  @Get(":id")
  @ApiMessage(CategorySwaggerMessage.GetById)
  async get(
    @Param("id", ParseIntPipe) id: Id,
  ): ApiResponse<CategoryEntity | null> {
    const category = await this.categoryService.getById(id);
    return ResponseBuilder.ok(category);
  }

  @Get()
  @ApiMessage(CategorySwaggerMessage.Filter)
  async filter(@Query() paginationDto: PaginationDto): ApiResponse<object> {
    const categories = await this.categoryService.filter(paginationDto);
    return ResponseBuilder.ok(categories);
  }

  @Post()
  @ApiAuth()
  @ApiMessage(CategorySwaggerMessage.Create)
  async create(@Body() dto: CreateCategoryDto): ApiResponse<CategoryEntity> {
    const category = await this.categoryService.create(dto);
    return ResponseBuilder.created(category, CategoryMessage.Created);
  }

  @ApiAuth()
  @Patch(":id")
  @ApiMessage(CategorySwaggerMessage.Update)
  async update(
    @Param("id", ParseIntPipe) id: Id,
    @Body() dto: UpdateCategoryDto,
  ): ApiResponse<CategoryEntity> {
    const category = await this.categoryService.update(id, dto);
    return ResponseBuilder.updated(category, CategoryMessage.Updated);
  }

  @ApiAuth()
  @Delete(":id")
  @ApiMessage(CategorySwaggerMessage.Delete)
  async delete(@Param("id", ParseIntPipe) id: Id): ApiResponse<null> {
    await this.categoryService.deleteById(id);
    return ResponseBuilder.deleted();
  }
}

export default CategoryController;
