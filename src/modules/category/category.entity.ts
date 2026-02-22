import { Column, Entity, OneToMany } from "typeorm";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";
import BlogCategoryEntity from "../blog-category/blog-category.entity";

@Entity(EntityName.Category)
class CategoryEntity extends BaseEntity {
  @Column("varchar", { length: 150, unique: true })
  title: string;

  @Column("int", { nullable: true })
  priority?: number;

  @OneToMany(
    () => BlogCategoryEntity,
    (blogCategory) => blogCategory.category,
    { onDelete: "SET NULL" },
  )
  blogCategories: BlogCategoryEntity[];
}

export default CategoryEntity;
