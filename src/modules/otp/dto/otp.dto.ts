import { IsInt, IsNotEmpty, IsBoolean, IsEmpty } from "class-validator";

class CreateOtpDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

class UpdateOtpDto {
  @IsEmpty()
  @IsBoolean()
  isNewRequest?: boolean;

  @IsEmpty()
  @IsBoolean()
  isCodeInvalid?: boolean;

  @IsEmpty()
  @IsBoolean()
  verify?: boolean;
}

export { CreateOtpDto, UpdateOtpDto };
