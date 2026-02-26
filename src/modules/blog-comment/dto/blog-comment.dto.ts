import type { Id } from "src/common/types/entity.type";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import ToBoolean from "src/common/decorators/boolean-transformet.decorator";

import {
  Length,
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
} from "class-validator";

class FilterBlogCommentDto extends PaginationDto {}

class CreateBlogCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 200)
  @ApiProperty({ default: "", minLength: 5, maxLength: 200 })
  text: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ default: "", type: "integer" })
  blogId: Id;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ default: "", type: "integer" })
  parentId?: Id;
}

class UpdateBlogCommentDto {
  @ToBoolean()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isVerified: boolean;
}

export { FilterBlogCommentDto, CreateBlogCommentDto, UpdateBlogCommentDto };
