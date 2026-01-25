import AuthType from "../enums/type.enum";
import AuthMethod from "../enums/method.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

class AuthDto {
  @ApiProperty({ enum: AuthType })
  @IsEnum(AuthType)
  type: AuthType;

  @ApiProperty({ enum: AuthMethod })
  @IsEnum(AuthMethod)
  method: AuthMethod;

  @ApiProperty({ maxLength: 100 })
  @Length(3, 100)
  @IsString()
  @IsNotEmpty()
  value: string;
}

export { AuthDto };
