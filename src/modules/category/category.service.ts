import { Not, type Repository } from "typeorm";
import CategoryEntity from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryMessage } from "./category.message";
import type { Id } from "src/common/types/entity.type";
import { Pagination } from "src/common/utils/pagination.util";
import { BaseService } from "src/common/abstracts/base.service";
import type { PaginationDto } from "src/common/dto/pagination.dto";
import type { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
  }

  async getById(id: Id) {
    return this.repository.findOneBy({ id });
  }

  async filter(query: PaginationDto) {
    const { limit, pageNumber, skip } = Pagination.solve(query);
    const [categories, totalCount] = await this.repository.findAndCount({
      take: limit,
      skip,
    });

    return {
      data: categories,
      pagination: Pagination.generate(limit, pageNumber, totalCount),
    };
  }

  async create(dto: CreateCategoryDto) {
    const doesTitleExists = await this.repository.existsBy({
      title: dto.title,
    });

    if (doesTitleExists) {
      throw new ConflictException(CategoryMessage.DuplicateTitle);
    }

    return this.createEntity(dto);
  }

  async update(id: Id, dto: UpdateCategoryDto) {
    const category = await this.repository.findOneBy({ id });
    if (!category) throw new NotFoundException(CategoryMessage.NotFound);

    const { title = undefined, priority = undefined } = dto;

    if (title) {
      const doesTitleExists = await this.repository.existsBy({
        title,
        id: Not(id),
      });

      if (doesTitleExists) {
        throw new ConflictException(CategoryMessage.DuplicateTitle);
      }

      category.title = title;
    }

    if (priority) category.priority = +priority;
    return this.saveChanges(category);
  }

  async deleteById(id: Id) {
    const category = await this.repository.findOneBy({ id });
    if (!category) throw new NotFoundException(CategoryMessage.NotFound);

    return this.repository.remove(category);
  }
}

export default CategoryService;
