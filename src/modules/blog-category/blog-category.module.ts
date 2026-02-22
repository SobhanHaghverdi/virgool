import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlogCategoryEntity from "./blog-category.entity";
import BlogCategoryService from "./blog-category.service";

@Module({
  providers: [BlogCategoryService],
  imports: [TypeOrmModule.forFeature([BlogCategoryEntity])],
})
class BlogCategoryModule {}

export default BlogCategoryModule;
