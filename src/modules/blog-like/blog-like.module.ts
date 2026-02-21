import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlogLikeEntity from "./blog-like.entity";
import BlogLikeService from "./blog-like.service";

@Module({
  providers: [BlogLikeService],
  imports: [TypeOrmModule.forFeature([BlogLikeEntity])],
})
class BlogLikeModule {}

export default BlogLikeModule;
