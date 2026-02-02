import { Repository } from "typeorm";
import UserEntity from "./entities/user.entity";
import type { CreateUserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";

import {
  Injectable,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
class UserService {
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
  ) {
    this.userRepository = userRepository;
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

    const doesUserExists = await this.userRepository.existsBy({
      [authMethod!]: identifier,
    });

    if (doesUserExists) {
      throw new ConflictException("کاربری با این مشخصات قبلا ثبت نام کرده است");
    }

    let user = this.userRepository.create(dto);
    user = await this.save(user);

    //* Generate user name
    user.userName = `m_${user.id}`;
    return await this.save(user);
  }

  public async save(entity: UserEntity) {
    return await this.userRepository.save(entity);
  }
}

export default UserService;
