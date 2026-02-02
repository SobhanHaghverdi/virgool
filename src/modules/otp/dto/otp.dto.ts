import { IsInt, IsNotEmpty } from "class-validator";

class CreateOtpDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

export { CreateOtpDto };
