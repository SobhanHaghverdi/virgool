import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum BlogLikeMessage {
  DisLiked = "لایک شما حذف شد.",
  Liked = "مقاله با موفقیت لایک شد.",
}

type BlogLikeMessageKey = "Like";

const BlogLikeSwaggerMessage: Record<BlogLikeMessageKey, MessageStructure> = {
  Like: {
    summary: "Like blog",
    responses: {
      notFound: "Blog not found",
      success: "Blog liked or disliked",
    },
  },
};

export { BlogLikeMessage, BlogLikeSwaggerMessage };
