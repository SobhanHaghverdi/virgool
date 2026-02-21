import type { Request } from "express";
import UserService from "./user.service";
import { UpdateUserDto } from "./user.dto";
import type UserEntity from "./user.entity";
import { ApiConsumes } from "@nestjs/swagger";
import type { Id } from "src/common/types/entity.type";
import { FileFormat } from "src/common/enums/file.enum";
import ApiAuth from "src/common/decorators/api-auth.decorator";
import ResponseBuilder from "src/common/utils/response-builder";
import { UserMessage, UserSwaggerMessage } from "./user.message";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";
import ApiMessage from "src/common/decorators/api-message.decorator";
import UserProfileService from "../user-profile/user-profile.service";
import CleanMultipartPipe from "src/common/pipes/clean-multipart.pipe";
import type UserProfileEntity from "../user-profile/user-profile.entity";
import type { ApiResponse } from "src/common/types/client-response.type";
import { MultipleFileUpload } from "src/common/decorators/file-upload.decorator";

import {
  UserProfileFilesDto,
  UpsertUserProfileDto,
} from "../user-profile/dto/user-profile.dto";

import {
  UserProfileMessage,
  UserProfileSwaggerMessage,
} from "../user-profile/user-profile.message";

import {
  Get,
  Req,
  Body,
  Patch,
  Param,
  Controller,
  ParseIntPipe,
  ParseFilePipe,
  UploadedFiles,
} from "@nestjs/common";

@Controller("users")
class UserController {
  private readonly userService: UserService;
  private readonly userProfileService: UserProfileService;

  constructor(
    userService: UserService,
    userProfileService: UserProfileService,
  ) {
    this.userService = userService;
    this.userProfileService = userProfileService;
  }

  @ApiAuth()
  @Get("profile")
  @ApiMessage(UserProfileSwaggerMessage.GetProfile)
  async getProfile(@Req() req: Request): ApiResponse<UserProfileEntity | null> {
    const profile = await this.userProfileService.getByUserId(req.user!.userId);
    return ResponseBuilder.ok(profile);
  }

  @ApiAuth()
  @Patch("profile")
  @ApiConsumes(SwaggerConsume.MultipartFormData)
  @ApiMessage(UserProfileSwaggerMessage.UpsertProfile)
  @MultipleFileUpload(
    "user-profile",
    [
      { name: "image", maxCount: 1 },
      { name: "backgroundImage", maxCount: 1 },
    ],
    [FileFormat.Png, FileFormat.Jpg, FileFormat.Jpeg],
  )
  async upsertProfile(
    @Req() req: Request,
    @Body(CleanMultipartPipe) dto: UpsertUserProfileDto,
    @UploadedFiles(new ParseFilePipe({ fileIsRequired: false }))
    files: UserProfileFilesDto,
  ): ApiResponse<UserProfileEntity> {
    const userId = req.user?.userId ?? 0;

    const userProfile = await this.userProfileService.upsert(
      userId,
      dto,
      files,
    );

    return ResponseBuilder.ok(userProfile, UserProfileMessage.Upsert);
  }

  @Patch()
  @ApiAuth()
  @ApiMessage(UserSwaggerMessage.Update)
  async updateCurrentUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): ApiResponse<UserEntity> {
    const user = await this.userService.update(req.user!.userId, dto);
    return ResponseBuilder.ok(user, UserMessage.Updated);
  }

  @Patch(":id")
  @ApiAuth()
  @ApiMessage(UserSwaggerMessage.Update)
  async update(
    @Body() dto: UpdateUserDto,
    @Param("id", ParseIntPipe) id: Id,
  ): ApiResponse<UserEntity> {
    const user = await this.userService.update(id, dto);
    return ResponseBuilder.ok(user, UserMessage.Updated);
  }
}

export default UserController;
