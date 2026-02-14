import { type Repository } from "typeorm";
import CategoryEntity from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryMessage } from "./category.message";
import type { CreateCategoryDto } from "./dto/category.dto";
import { Pagination } from "src/common/utils/pagination.util";
import { ConflictException, Injectable } from "@nestjs/common";
import { BaseService } from "src/common/abstracts/base.service";
import type { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
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

    return await this.createEntity(dto);
  }
}

export default CategoryService;
