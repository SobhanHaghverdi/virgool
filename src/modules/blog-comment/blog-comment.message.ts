import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum BlogCommentMessage {
  NotFound = "نظر یافت نشد.",
  Created = "نظر با موفقیت ایجاد شد.",
  Updated = "نظر با موفقیت ویرایش شد.",
}

type BlogCommentMessageKey = "Create" | "Update" | "Filter";

const BlogCommentSwaggerMessage: Record<
  BlogCommentMessageKey,
  MessageStructure
> = {
  Filter: {
    summary: "Filter blog comments",
    responses: {
      success: "Filtered list of blog comments",
    },
  },
  Create: {
    summary: "Create blog comment",
    responses: {
      notFound: "Blog or parent comment not found",
      created: "Blog comment created successfully",
    },
  },
  Update: {
    summary: "Update blog comment",
    responses: {
      notFound: "Blog comment not found",
      success: "Blog comment updated successfully",
    },
  },
};

export { BlogCommentSwaggerMessage, BlogCommentMessage };
