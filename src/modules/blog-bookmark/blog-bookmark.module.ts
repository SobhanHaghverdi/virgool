import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlogBookmarkEntity from "./blog-bookmark.entity";
import BlogBookmarkService from "./blog-bookmark.service";

@Module({
  providers: [BlogBookmarkService],
  imports: [TypeOrmModule.forFeature([BlogBookmarkEntity])],
})
class BlogBookmarkModule {}

export default BlogBookmarkModule;
