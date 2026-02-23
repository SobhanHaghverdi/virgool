import { Injectable } from "@nestjs/common";

import type {
  Repository,
  DeepPartial,
  SaveOptions,
  EntityManager,
  ObjectLiteral,
} from "typeorm";

@Injectable()
abstract class BaseService<T extends ObjectLiteral> {
  protected readonly repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  protected async createEntity(
    data: DeepPartial<T>,
    entityManager?: EntityManager,
  ) {
    const manager = entityManager ?? this.repository.manager;
    const entity = manager.create(this.repository.target, data);

    return this.saveChanges(entity, manager);
  }

  protected async bulkInsert(
    dataArray: DeepPartial<T>[],
    entityManager?: EntityManager,
  ): Promise<T[]> {
    if (dataArray.length === 0) {
      return [];
    }

    const manager = entityManager ?? this.repository.manager;

    const insertResult = await manager
      .createQueryBuilder()
      .insert()
      .into(this.repository.target)
      .values(dataArray as any[])
      .returning("*")
      .execute();

    return insertResult.generatedMaps as T[];
  }

  async saveChanges(
    entity: T,
    entityManager?: EntityManager,
    options?: SaveOptions,
  ) {
    const manager = entityManager ?? this.repository.manager;
    return manager.save(entity, options);
  }
}

export { BaseService };
