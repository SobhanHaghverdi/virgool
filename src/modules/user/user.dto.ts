import { PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";

class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
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
