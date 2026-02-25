import BlogModule from "../blog/blog.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlogLikeEntity from "./blog-like.entity";
import BlogLikeService from "./blog-like.service";
import { Module, forwardRef } from "@nestjs/common";

@Module({
  exports: [BlogLikeService],
  providers: [BlogLikeService],
  imports: [
    forwardRef(() => BlogModule),
    TypeOrmModule.forFeature([BlogLikeEntity]),
  ],
})
class BlogLikeModule {}

export default BlogLikeModule;
