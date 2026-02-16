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
