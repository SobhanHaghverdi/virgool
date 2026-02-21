import type { Id } from "src/common/types/entity.type";
import { AuthMethod } from "src/modules/auth/enums/auth.enum";
import { IsNotEmpty, IsBoolean, IsOptional, IsEnum } from "class-validator";

class CreateOtpDto {
  @IsNotEmpty()
  userId: Id;

  @IsNotEmpty()
  @IsEnum(AuthMethod)
  method: AuthMethod;
}

class UpdateOtpDto {
  @IsBoolean()
  @IsOptional()
  isNewRequest?: boolean;

  @IsBoolean()
  @IsOptional()
  isCodeInvalid?: boolean;

  @IsBoolean()
  @IsOptional()
  verify?: boolean;
}

export { CreateOtpDto, UpdateOtpDto };
