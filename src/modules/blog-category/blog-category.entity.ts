import BlogEntity from "../blog/blog.entity";
import type { Id } from "src/common/types/entity.type";
import CategoryEntity from "../category/category.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";

@Entity(EntityName.BlogCategory)
class BlogCategoryEntity extends BaseEntity {
  @Column("int", { name: "blog_id" })
  blogId: Id;

  @Column("int", { name: "category_id" })
  categoryId: Id;

  @JoinColumn({ name: "category_id" })
  @ManyToOne(
    () => CategoryEntity,
    (blogCategory) => blogCategory.blogCategories,
    { onDelete: "CASCADE" },
  )
  category: CategoryEntity;

  @JoinColumn({ name: "blog_id" })
  @ManyToOne(() => BlogEntity, (blog) => blog.categories, {
    onDelete: "CASCADE",
  })
  blog: BlogEntity;
}

export default BlogCategoryEntity;
