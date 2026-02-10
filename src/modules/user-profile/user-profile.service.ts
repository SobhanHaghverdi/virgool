import { type Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserProfileEntity from "./user-profile.entity";

@Injectable()
class UserProfileService {
  private readonly userProfileReporitory: Repository<UserProfileEntity>;

  constructor(
    @InjectRepository(UserProfileEntity)
    userProfileReporitory: Repository<UserProfileEntity>,
  ) {
    this.userProfileReporitory = userProfileReporitory;
  }
}

export default UserProfileService;
