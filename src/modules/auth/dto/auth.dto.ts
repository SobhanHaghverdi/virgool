import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Length } from "class-validator";

class AuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ minLength: 3, maxLength: 150, default: "" })
  identifier: string; //* Can be either user name, email or phone number
}

export { AuthDto };
