import Gender from "../enums/gender.enum";
import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";

class UpsertUserProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiPropertyOptional({ default: "", maxLength: 150 })
  nickName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiPropertyOptional({ default: "", maxLength: 200 })
  bio?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiPropertyOptional({ default: "", enum: Gender })
  gender?: Gender;

  @IsOptional()
  @ApiPropertyOptional({ default: "", format: "binary" })
  image?: string;

  @IsOptional()
  @ApiPropertyOptional({ default: "", format: "binary" })
  backgroundImage?: string;

  @IsOptional()
  @ApiPropertyOptional({ default: "", example: new Date().toISOString() })
  @Transform((birthDate) =>
    birthDate ? new Date(birthDate.value).toISOString() : undefined,
  )
  birthDate?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiPropertyOptional({ default: "", maxLength: 150 })
  linkedinProfile?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiPropertyOptional({ default: "", maxLength: 150 })
  xProfile?: string;
}

class UserProfileFilesDto {
  image?: Express.Multer.File[];
  backgroundImage?: Express.Multer.File[];
}

export { UpsertUserProfileDto, UserProfileFilesDto };
