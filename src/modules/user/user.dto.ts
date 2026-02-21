import { Transform } from "class-transformer";
import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  @ApiPropertyOptional({ default: "", maxLength: 150 })
  @Transform((email) => email?.value?.trim()?.toLowerCase())
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  @Transform((phoneNumber) => phoneNumber?.value?.trim()?.toLowerCase())
  phoneNumber?: string;
}

class UpdateUserDto extends PartialType(CreateUserDto) {}

export { CreateUserDto, UpdateUserDto };
