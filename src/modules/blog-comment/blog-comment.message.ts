import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum BlogCommentMessage {
  NotFound = "نظر یافت نشد.",
  Created = "نظر با موفقیت ایجاد شد.",
}

type BlogCommentMessageKey = "Create";

const BlogCommentSwaggerMessage: Record<
  BlogCommentMessageKey,
  MessageStructure
> = {
  Create: {
    summary: "Create blog comment",
    responses: {
      notFound: "Blog or parent comment not found",
      created: "Comment blog created successfully",
    },
  },
};

export { BlogCommentSwaggerMessage, BlogCommentMessage };
