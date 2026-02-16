import CategoryService from "./category.service";
import type CategoryEntity from "./category.entity";
import type { Id } from "src/common/types/entity.type";
import { PaginationDto } from "src/common/dto/pagination.dto";
import ResponseBuilder from "src/common/utils/response-builder";
import ApiEndpoint from "src/common/decorators/api-endpoint.decorator";
import type { ApiResponse } from "src/common/types/client-response.type";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";

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

  @Get(":id")
  @ApiEndpoint({
    summary: CategorySwaggerOperationMessage.GetById,
    successMessage: CategorySwaggerResponseMessage.Get,
  })
  async get(
    @Param("id", ParseIntPipe) id: Id,
  ): ApiResponse<CategoryEntity | null> {
    const category = await this.categoryService.getById(id);
    return ResponseBuilder.ok(category);
  }

  @Get()
  @ApiEndpoint({
    summary: CategorySwaggerOperationMessage.Filter,
    successMessage: CategorySwaggerResponseMessage.Filter,
  })
  async filter(@Query() paginationDto: PaginationDto): ApiResponse<object> {
    const categories = await this.categoryService.filter(paginationDto);
    return ResponseBuilder.ok(categories);
  }

  @Post()
  @ApiEndpoint({
    summary: CategorySwaggerOperationMessage.Create,
    createdMessage: CategorySwaggerResponseMessage.Created,
  })
  async create(@Body() dto: CreateCategoryDto): ApiResponse<CategoryEntity> {
    const category = await this.categoryService.create(dto);
    return ResponseBuilder.created(category, CategoryMessage.Created);
  }

  @Patch(":id")
  @ApiEndpoint({
    summary: CategorySwaggerOperationMessage.Update,
    successMessage: CategorySwaggerResponseMessage.Updated,
    notFoundMessage: CategorySwaggerResponseMessage.NotFound,
  })
  async update(
    @Param("id", ParseIntPipe) id: Id,
    @Body() dto: UpdateCategoryDto,
  ): ApiResponse<CategoryEntity> {
    const category = await this.categoryService.update(id, dto);
    return ResponseBuilder.updated(category, CategoryMessage.Updated);
  }

  @Delete(":id")
  @ApiEndpoint({
    summary: CategorySwaggerOperationMessage.Delete,
    notFoundMessage: CategorySwaggerResponseMessage.NotFound,
    noContentMessage: CategorySwaggerResponseMessage.Deleted,
  })
  async delete(@Param("id", ParseIntPipe) id: Id): ApiResponse<null> {
    await this.categoryService.deleteById(id);
    return ResponseBuilder.deleted();
  }
}

export default CategoryController;
