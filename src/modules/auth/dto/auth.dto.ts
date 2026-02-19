import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import type { Id } from "src/common/types/entity.type";
import { IsNotEmpty, IsString, Length } from "class-validator";

class AuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    default: "",
    minLength: 3,
    maxLength: 150,
    description: "Can be user name, email or phone number",
  })
  identifier: string; //* Can be either user name, email or phone number
}

class VerifyOtpDto {
  @IsNotEmpty()
  @ApiProperty({ default: "", type: "integer" })
  userId: Id;

  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  @ApiProperty({
    default: "",
    minLength: 5,
    maxLength: 5,
  })
  code: string;
}

export { AuthDto, VerifyOtpDto };
