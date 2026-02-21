import UserEntity from "./user.entity";
import { UserMessage } from "./user.message";
import AuthService from "../auth/auth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AuthMethod } from "../auth/enums/auth.enum";
import type { Id } from "src/common/types/entity.type";
import type { CreateUserDto, UpdateUserDto } from "./user.dto";
import { BaseService } from "src/common/abstracts/base.service";

import {
  Inject,
  Injectable,
  forwardRef,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
class UserService extends BaseService<UserEntity> {
  private readonly authService: AuthService;

  constructor(
    @Inject(forwardRef(() => AuthService)) authService: AuthService,
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
    this.authService = authService;
  }

  async getById(id: Id) {
    return this.repository.findOne({
      where: { id },
      relations: { otps: true },
    });
  }

  async getByAuthMethod(authMethod: AuthMethod, identifier: string) {
    return this.repository.findOneBy({ [authMethod]: identifier });
  }

  async create(dto: CreateUserDto, entityManager?: EntityManager) {
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
    return this.saveChanges(user, manager);
  }

  async update(id: Id, dto: UpdateUserDto) {
    const { email = undefined } = dto;
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new NotFoundException(UserMessage.NotFound);

    let pendingEmail: string | undefined = undefined;

    //* Check email existence
    if (email && user.email !== email) {
      await this.changeEmail(user.id, email);
      pendingEmail = email;

      delete dto.email;
    }

    Object.assign(user, dto, { pendingEmail });
    return this.saveChanges(user);
  }

  private async changeEmail(userId: Id, email: string) {
    const doesEmailExists = await this.repository.existsBy({ email });

    if (doesEmailExists) {
      throw new ConflictException(UserMessage.DuplicateEmail);
    }

    //* Create new otp
    await this.authService.authenticate({ identifier: email, userId });
  }
}

export default UserService;
