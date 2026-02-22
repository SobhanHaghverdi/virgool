import BlogEntity from "./blog.entity";
import { Module } from "@nestjs/common";
import BlogService from "./blog.service";
import BlogController from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [TypeOrmModule.forFeature([BlogEntity])],
})
class BlogModule {}

export default BlogModule;
