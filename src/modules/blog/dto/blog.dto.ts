import type { Id } from "src/common/types/entity.type";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import {
  Length,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from "class-validator";

class FilterBlogDto extends PaginationDto {
  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ default: "", type: "integer" })
  authorId?: Id;
}

class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  @ApiProperty({ default: "", minLength: 3, maxLength: 150 })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 300)
  @ApiProperty({ default: "", minLength: 2, maxLength: 300 })
  shortDescription: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  @ApiPropertyOptional({ default: "", maxLength: 300 })
  slug?: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ default: "", type: "integer" })
  timeForStudy: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 1000)
  @ApiProperty({ default: "", minLength: 2, maxLength: 1000 })
  description: string;

  @IsOptional()
  @ApiPropertyOptional({ default: "", format: "binary" })
  image?: string;
}

export { CreateBlogDto, FilterBlogDto };
