import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString, Length } from "class-validator";

class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ minLength: 3, maxLength: 150, default: "" })
  title: string;

  @IsEmpty()
  @ApiPropertyOptional({ default: "", type: "integer" })
  priority?: number;
}

export { CreateCategoryDto };
