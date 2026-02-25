import { Module } from "@nestjs/common";
import BlogModule from "../blog/blog.module";
import AuthModule from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlogCommentEntity from "./blog-comment.entity";
import BlogCommentService from "./blog-comment.service";
import BlogCommentController from "./blog-comment.controller";

@Module({
  providers: [BlogCommentService],
  controllers: [BlogCommentController],
  imports: [
    AuthModule,
    BlogModule,
    TypeOrmModule.forFeature([BlogCommentEntity]),
  ],
})
class BlogCommentModule {}

export default BlogCommentModule;
