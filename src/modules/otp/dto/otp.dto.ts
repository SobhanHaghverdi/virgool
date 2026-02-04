import { IsInt, IsNotEmpty, IsBoolean } from "class-validator";

class CreateOtpDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

class UpdateOtpDto {
  @IsBoolean()
  isNewRequest: boolean = false;
}

export { CreateOtpDto, UpdateOtpDto };
