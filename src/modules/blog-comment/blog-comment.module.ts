import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlogCommentEntity from "./blog-comment.entity";
import BlogCommentService from "./blog-comment.service";

@Module({
  providers: [BlogCommentService],
  imports: [TypeOrmModule.forFeature([BlogCommentEntity])],
})
class BlogCommentModule {}

export default BlogCommentModule;
