import type { PaginationDto } from "../dto/pagination.dto";

class Pagination {
  static solve(paginationDto: PaginationDto) {
    let { pageNumber, limit } = paginationDto;

    if (pageNumber < 0) pageNumber = 1;
    if (limit < 0) limit = 20;

    const skip = (pageNumber - 1) * limit;
    return { pageNumber, limit, skip };
  }

  static generate(
    limit: number = 0,
    pageNumber: number = 0,
    totalCount: number = 0,
  ) {
    return {
      totalCount,
      limit: +limit,
      pageNumber: +pageNumber,
      pageCount: Math.ceil(totalCount / limit),
    };
  }
}
export { Pagination };
