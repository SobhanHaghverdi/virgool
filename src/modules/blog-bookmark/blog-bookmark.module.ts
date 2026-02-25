import BlogModule from "../blog/blog.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import BlogBookmarkEntity from "./blog-bookmark.entity";
import BlogBookmarkService from "./blog-bookmark.service";

@Module({
  exports: [BlogBookmarkService],
  providers: [BlogBookmarkService],
  imports: [
    forwardRef(() => BlogModule),
    TypeOrmModule.forFeature([BlogBookmarkEntity]),
  ],
})
class BlogBookmarkModule {}

export default BlogBookmarkModule;
