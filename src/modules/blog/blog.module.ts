import BlogEntity from "./blog.entity";
import { Module } from "@nestjs/common";
import BlogService from "./blog.service";
import AuthModule from "../auth/auth.module";
import BlogController from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [AuthModule, TypeOrmModule.forFeature([BlogEntity])],
})
class BlogModule {}

export default BlogModule;
