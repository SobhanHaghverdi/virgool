import type { Id } from "src/common/types/entity.type";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import {
  Length,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
} from "class-validator";

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

export { CreateBlogCommentDto };
