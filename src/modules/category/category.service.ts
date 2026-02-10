import { type Repository } from "typeorm";
import CategoryEntity from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryMessage } from "./category.message";
import type { CreateCategoryDto } from "./dto/category.dto";
import { ConflictException, Injectable } from "@nestjs/common";
import { BaseService } from "src/common/abstracts/base.service";

@Injectable()
class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
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
