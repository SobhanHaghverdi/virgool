import { ApiPropertyOptional } from "@nestjs/swagger";

class PaginationDto {
  @ApiPropertyOptional({ type: "integer", default: 1 })
  pageNumber: number = 1;

  @ApiPropertyOptional({ type: "integer", default: 20 })
  limit: number = 20;
}

export { PaginationDto };
