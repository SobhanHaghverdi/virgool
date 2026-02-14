import CategoryService from "./category.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import ResponseBuilder from "src/common/utils/response-builder";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";

import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  Controller,
  ParseIntPipe,
} from "@nestjs/common";

import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
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

  @Get(":id")
  @ApiOperation({ summary: CategorySwaggerOperationMessage.GetById })
  @ApiOkResponse({ description: CategorySwaggerResponseMessage.Get })
  async get(@Param("id", ParseIntPipe) id: number) {
    const category = await this.categoryService.getById(id);
    return ResponseBuilder.ok(category);
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

  @Patch(":id")
  @ApiOperation({ summary: CategorySwaggerOperationMessage.Update })
  @ApiOkResponse({ description: CategorySwaggerResponseMessage.Updated })
  @ApiNotFoundResponse({ description: CategorySwaggerResponseMessage.NotFound })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, dto);
    return ResponseBuilder.updated(category, CategoryMessage.Updated);
  }

  @Delete(":id")
  @ApiOperation({ summary: CategorySwaggerOperationMessage.Delete })
  @ApiNoContentResponse({ description: CategorySwaggerResponseMessage.Deleted })
  @ApiNotFoundResponse({ description: CategorySwaggerResponseMessage.NotFound })
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.categoryService.deleteById(id);
    return ResponseBuilder.deleted();
  }
}

export default CategoryController;
