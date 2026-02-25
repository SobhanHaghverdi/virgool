import type { Id } from "src/common/types/entity.type";

class CreateBlogCategoryDto {
  blogId: Id;
  categoryId: Id;
}

export { CreateBlogCategoryDto };
