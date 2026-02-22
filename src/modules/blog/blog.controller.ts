import BlogService from "./blog.service";
import { Controller } from "@nestjs/common";

@Controller("blog")
class BlogController {
  private readonly blogService: BlogService;

  constructor(blogService: BlogService) {
    this.blogService = blogService;
  }
}

export default BlogController;
