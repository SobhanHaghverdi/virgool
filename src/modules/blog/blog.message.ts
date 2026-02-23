import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum BlogMessage {
  NotFound = "بلاگ یافت نشد.",
  Created = "بلاگ با موفقیت ایجاد شد.",
  DuplicateSlug = "اسلاگ بلاگ از قبل وجود دارد.",
  DuplicateTitle = "عنوان بلاگ از قبل وجود دارد.",
}

type BlogMessageKey = "Create" | "Delete" | "Filter";

const BlogSwaggerMessage: Record<BlogMessageKey, MessageStructure> = {
  Filter: {
    summary: "Filter blogs",
    responses: {
      success: "List of filtered blogs",
    },
  },
  Create: {
    summary: "Create blog",
    responses: {
      conflict: "Duplicate title or slug",
      created: "Blog created successfully",
    },
  },
  Delete: {
    summary: "Delete blog",
    responses: {
      notFound: "Blog not found",
      noContent: "Blog deleted successfully",
    },
  },
};

export { BlogMessage, BlogSwaggerMessage };
