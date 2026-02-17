import type { Id } from "src/common/types/entity.type";
import { IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

class CreateOtpDto {
  @IsNotEmpty()
  userId: Id;
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
