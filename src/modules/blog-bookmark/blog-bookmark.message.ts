import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum BlogBookmarkMessage {
  Bookmarked = "مقاله با موفقیت نشان شد.",
  Unbookmarked = "مقاله از نشان شده ها حذف شد.",
}

type BlogBookmarkMessageKey = "Bookmark";

const BlogBookmarkSwaggerMessage: Record<
  BlogBookmarkMessageKey,
  MessageStructure
> = {
  Bookmark: {
    summary: "Bookmark blog",
    responses: {
      notFound: "Blog not found",
      success: "Blog bookmarked or unbookmarked",
    },
  },
};

export { BlogBookmarkSwaggerMessage, BlogBookmarkMessage };
