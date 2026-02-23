import BlogEntity from "./blog.entity";
import { Module } from "@nestjs/common";
import BlogService from "./blog.service";
import AuthModule from "../auth/auth.module";
import BlogController from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import CategoryModule from "../category/category.module";
import BlogCategoryModule from "../blog-category/blog-category.module";

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [
    AuthModule,
    CategoryModule,
    BlogCategoryModule,
    TypeOrmModule.forFeature([BlogEntity]),
  ],
})
class BlogModule {}

export default BlogModule;
