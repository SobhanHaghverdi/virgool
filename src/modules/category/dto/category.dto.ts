import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ minLength: 3, maxLength: 150, default: "" })
  title: string;

  @ApiPropertyOptional({ default: "", type: "integer" })
  priority?: number;
}

class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export { CreateCategoryDto, UpdateCategoryDto };
