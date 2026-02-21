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
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException(UserMessage.NotFound);

    //* Check for email change or verification
    await this.changeOrVerifyEmail(user, dto);

    Object.assign(user, dto);
    return this.saveChanges(user);
  }

  private async changeOrVerifyEmail(user: UserEntity, dto: UpdateUserDto) {
    const { pendingEmail = undefined, isEmailVerified = undefined } = dto;

    //* Verify pending email
    if (isEmailVerified !== undefined && isEmailVerified && user.pendingEmail) {
      user.email = user.pendingEmail;
      user.pendingEmail = null;

      delete dto.pendingEmail;
    }
    //* Check email update
    else if (pendingEmail && user.email !== pendingEmail) {
      const doesEmailExists = await this.repository.exists({
        where: [{ email: pendingEmail }, { pendingEmail }],
      });

      if (doesEmailExists) {
        throw new ConflictException(UserMessage.DuplicateEmail);
      }

      //* Create new otp
      await this.authService.authenticate({
        userId: user.id,
        identifier: pendingEmail,
      });
    } else delete dto.pendingEmail;
  }
}

export default UserService;
