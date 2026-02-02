import { Repository } from "typeorm";
import UserEntity from "./entities/user.entity";
import type { CreateUserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
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

  public async create(dto: CreateUserDto) {
    const { email = undefined, phoneNumber = undefined } = dto;
    const identifier = phoneNumber || email;

    if (!identifier) {
      throw new BadRequestException("شماره موبایل یا ایمیل الزامی می باشد");
    }

    const authMethod = Object.entries(dto).find(
      (value) => value[1] === identifier,
    )?.[0];

    const doesUserExists = await this.repository.existsBy({
      [authMethod!]: identifier,
    });

    if (doesUserExists) {
      throw new ConflictException("کاربری با این مشخصات قبلا ثبت نام کرده است");
    }

    const user = await this.createEntity(dto);

    //* Generate user name
    user.userName = `m_${user.id}`;
    return await this.saveChanges(user);
  }
}

export default UserService;
