import type { Request } from "express";
import UserService from "./user.service";
import { ApiConsumes } from "@nestjs/swagger";
import { FileFormat } from "src/common/enums/file.enum";
import { multerStorage } from "src/common/utils/multer.util";
import ResponseBuilder from "src/common/utils/response-builder";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";
import UserProfileService from "../user-profile/user-profile.service";
import ApiEndpoint from "src/common/decorators/api-endpoint.decorator";
import CleanMultipartPipe from "src/common/pipes/clean-multipart.pipe";
import type UserProfileEntity from "../user-profile/user-profile.entity";
import type { ApiResponse } from "src/common/types/client-response.type";

import {
  UserProfileFilesDto,
  UpsertUserProfileDto,
} from "../user-profile/dto/user-profile.dto";

import {
  UserProfileMessage,
  UserProfileSwaggerOperationMessage,
  UserProfileSwaggerResponseMessage,
} from "../user-profile/user-profile.message";

import {
  Body,
  Req,
  Patch,
  Controller,
  ParseFilePipe,
  UploadedFiles,
  UseInterceptors,
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

  @Patch("profile")
  @ApiConsumes(SwaggerConsume.MultipartFormData)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "image", maxCount: 1 },
        { name: "backgroundImage", maxCount: 1 },
      ],
      {
        storage: multerStorage("user-profile", [
          FileFormat.Png,
          FileFormat.Jpg,
          FileFormat.Jpeg,
        ]),
      },
    ),
  )
  @ApiEndpoint({
    authRequired: true,
    summary: UserProfileSwaggerOperationMessage.Upsert,
    successMessage: UserProfileSwaggerResponseMessage.Upserted,
    notFoundMessage: UserProfileSwaggerResponseMessage.NotFound,
  })
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
}

export default UserController;
