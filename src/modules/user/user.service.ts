import { UserMessage } from "./user.message";
import UserEntity from "./entities/user.entity";
import type { CreateUserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { BaseService } from "src/common/abstracts/base.service";

import {
  Injectable,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  public async create(dto: CreateUserDto, entityManager?: EntityManager) {
    const manager = entityManager ?? this.repository.manager;
    const { email = undefined, phoneNumber = undefined } = dto;
    const identifier = phoneNumber || email;

    if (!identifier) {
      throw new BadRequestException(UserMessage.RequiredEmailOrPhoneNumber);
    }

    const authMethod = Object.entries(dto).find(
      (value) => value[1] === identifier,
    )?.[0];

    const doesUserExists = await manager.existsBy(UserEntity, {
      [authMethod!]: identifier,
    });

    if (doesUserExists) throw new ConflictException(UserMessage.Duplicate);

    const user = await this.createEntity(dto, manager);

    //* Generate user name
    user.userName = `m_${user.id}`;
    return await this.saveChanges(user, manager);
  }
}

export default UserService;
