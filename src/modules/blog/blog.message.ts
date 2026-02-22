import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum BlogMessage {
  Created = "بلاگ با موفقیت ایجاد شد.",
  DuplicateSlug = "اسلاگ بلاگ از قبل وجود دارد.",
  DuplicateTitle = "عنوان بلاگ از قبل وجود دارد.",
}

type BlogMessageKey = "Create";

const BlogSwaggerMessage: Record<BlogMessageKey, MessageStructure> = {
  Create: {
    summary: "Create blog",
    responses: {
      conflict: "Duplicate title or slug",
      created: "Blog created successfully",
    },
  },
};

export { BlogMessage, BlogSwaggerMessage };
