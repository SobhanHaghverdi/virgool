import { Not, type Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import UserProfileEntity from "./user-profile.entity";
import type { Id } from "src/common/types/entity.type";
import { UserProfileMessage } from "./user-profile.message";
import { BaseService } from "src/common/abstracts/base.service";

import type {
  UserProfileFilesDto,
  UpsertUserProfileDto,
} from "./dto/user-profile.dto";

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
class UserProfileService extends BaseService<UserProfileEntity> {
  constructor(
    @InjectRepository(UserProfileEntity)
    userProfileReporitory: Repository<UserProfileEntity>,
  ) {
    super(userProfileReporitory);
  }

  async getByUserId(userId: Id) {
    return this.repository.findOneBy({ userId });
  }

  async upsert(
    userId: Id,
    dto: UpsertUserProfileDto,
    files?: UserProfileFilesDto,
  ) {
    const profile = await this.repository.findOneBy({ userId });

    return profile
      ? this.update(profile.id, dto, files)
      : this.create(userId, dto, files);
  }

  async create(
    userId: Id,
    dto: UpsertUserProfileDto,
    files?: UserProfileFilesDto,
  ) {
    const { image, backgroundImage } = files ?? {};
    const doesProfileExists = await this.repository.existsBy({ userId });

    if (doesProfileExists) {
      throw new ConflictException(UserProfileMessage.Duplicate);
    }

    const imageName = image?.length ? image[0].filename : undefined;

    const backgroundImageName = backgroundImage?.length
      ? backgroundImage[0].filename
      : undefined;

    await this.validateFieldsForUpsert(dto);

    return this.createEntity({
      ...dto,
      userId,
      imageName,
      backgroundImageName,
    });
  }

  async update(id: Id, dto: UpsertUserProfileDto, files?: UserProfileFilesDto) {
    const { image, backgroundImage } = files ?? {};

    const profile = await this.repository.findOneBy({ id });
    if (!profile) throw new NotFoundException(UserProfileMessage.NotFound);

    const imageName = image?.length ? image[0].filename : undefined;

    const backgroundImageName = backgroundImage?.length
      ? backgroundImage[0].filename
      : undefined;

    await this.validateFieldsForUpsert(dto, id);

    Object.assign(profile, dto, { imageName, backgroundImageName });
    return this.saveChanges(profile);
  }

  private async validateFieldsForUpsert(dto: UpsertUserProfileDto, id: Id = 0) {
    const { xProfile, linkedinProfile } = dto;

    if (xProfile) {
      const doesXProfileExists = await this.repository.existsBy({
        xProfile,
        id: Not(id),
      });

      if (doesXProfileExists) {
        throw new ConflictException(UserProfileMessage.DuplicateXProfile);
      }
    }

    if (linkedinProfile) {
      const doesLinkedinProfileExists = await this.repository.existsBy({
        id: Not(id),
        linkedinProfile,
      });

      if (doesLinkedinProfileExists) {
        throw new ConflictException(
          UserProfileMessage.DuplicateLinkedinProfile,
        );
      }
    }
  }
}

export default UserProfileService;
