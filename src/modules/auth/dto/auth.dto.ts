import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

class AuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    default: "",
    minLength: 3,
    maxLength: 150,
    description: "Can be user name, email or phone number",
  })
  identifier: string; //* Can be either user name, email or phone number
}

class VerifyOtpDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ default: "", minimum: 1 })
  @Transform(({ value }) => parseInt(value))
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    default: "",
    minLength: 5,
    maxLength: 5,
  })
  code: string;
}

export { AuthDto, VerifyOtpDto };
