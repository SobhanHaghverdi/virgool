import { Transform } from "class-transformer";
import { IsEmpty, IsString, MaxLength } from "class-validator";

class CreateUserDto {
  @IsEmpty()
  @IsString()
  @MaxLength(150)
  @Transform((email) => email?.value?.trim()?.toLowerCase())
  email?: string;

  @IsEmpty()
  @IsString()
  @MaxLength(11)
  @Transform((phoneNumber) => phoneNumber?.value?.trim()?.toLowerCase())
  phoneNumber?: string;
}

export { CreateUserDto };
