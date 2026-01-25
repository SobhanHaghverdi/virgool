import { Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import AuthType from "./enums/type.enum";
import AuthMethod from "./enums/method.enum";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "../user/entities/user.entity";
import { isEmail, isMobilePhone } from "class-validator";
import UserProfileEntity from "../user/entities/user-profile.entity";
import { AuthMessage, BadRequestMessage } from "src/common/enums/message.enum";

import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
class AuthService {
  private readonly userRepository: Repository<UserEntity>;
  private readonly userProfileRepository: Repository<UserProfileEntity>;

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    userProfileRepository: Repository<UserProfileEntity>
  ) {
    this.userRepository = userRepository;
    this.userProfileRepository = userProfileRepository;
  }

  public async checkUserExistence(dto: AuthDto) {
    const { type, method, value } = dto;

    switch (type) {
      case AuthType.Login:
        return this.login(method, value);

      case AuthType.Register:
        return this.register(method, value);

      default:
        throw new UnauthorizedException();
    }
  }

  public async login(method: AuthMethod, value: string) {
    const validValue = this.validateValue(method, value);

    let user: UserEntity | null = await this.getExistingUser(
      method,
      validValue
    );

    if (!user) throw new UnauthorizedException(AuthMessage.NotFoundUser);
  }

  public async register(method: AuthMethod, value: string) {
    const validValue = this.validateValue(method, value);

    let user: UserEntity | null = await this.getExistingUser(
      method,
      validValue
    );

    if (user) throw new ConflictException(AuthMessage.AlreadyExistsUser);
  }

  public async checkOtp() {}

  public async getExistingUser(method: AuthMethod, value: string) {
    let user: UserEntity | null;

    if (method === AuthMethod.Phone) {
      user = await this.userRepository.findOneBy({
        phoneNumber: value.trim(),
      });
    } else if (method === AuthMethod.Email) {
      user = await this.userRepository.findOneBy({
        email: value.trim(),
      });
    } else if (method === AuthMethod.UserName) {
      user = await this.userRepository.findOneBy({
        userName: value.trim(),
      });
    } else {
      throw new BadRequestException(BadRequestMessage.InvalidAuthType);
    }

    return user;
  }

  private validateValue(method: AuthMethod, value: string) {
    switch (method) {
      case AuthMethod.UserName:
        break;

      case AuthMethod.Email: {
        if (!isEmail(value)) throw new BadRequestException("Email is invalid");
        break;
      }

      case AuthMethod.Phone:
        if (!isMobilePhone(value, "fa-IR")) {
          throw new BadRequestException("Phone number is invalid");
        }
        break;

      default:
        throw new BadRequestException("Invalid auth method");
    }

    return value;
  }
}

export default AuthService;
