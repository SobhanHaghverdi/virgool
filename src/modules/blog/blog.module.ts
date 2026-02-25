import BlogEntity from "./blog.entity";
import BlogService from "./blog.service";
import AuthModule from "../auth/auth.module";
import BlogController from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import CategoryModule from "../category/category.module";
import BlogLikeModule from "../blog-like/blog-like.module";
import BlogCategoryModule from "../blog-category/blog-category.module";
import BlogBookmarkModule from "../blog-bookmark/blog-bookmark.module";

@Module({
  exports: [BlogService],
  providers: [BlogService],
  controllers: [BlogController],
  imports: [
    AuthModule,
    CategoryModule,
    BlogCategoryModule,
    forwardRef(() => BlogLikeModule),
    forwardRef(() => BlogBookmarkModule),
    TypeOrmModule.forFeature([BlogEntity]),
  ],
})
class BlogModule {}

export default BlogModule;
