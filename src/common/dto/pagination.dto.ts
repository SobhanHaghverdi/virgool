import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

class PaginationDto {
  @IsOptional()
  @ApiPropertyOptional({ type: "integer", default: 1 })
  pageNumber: number = 1;

  @IsOptional()
  @ApiPropertyOptional({ type: "integer", default: 20 })
  limit: number = 20;
}

export { PaginationDto };
