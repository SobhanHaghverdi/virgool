import UserEntity from "../user/user.entity";
import BlogEntity from "../blog/blog.entity";
import type { Id } from "src/common/types/entity.type";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";

import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

@Entity(EntityName.BlogLike)
class BlogLikeEntity extends BaseEntity {
  @Column("int", { name: "blog_id" })
  blogId: Id;

  @Column("int", { name: "user_id" })
  userId: Id;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity, (user) => user.likes, {
    onDelete: "CASCADE",
  })
  user: UserEntity;

  @JoinColumn({ name: "blog_id" })
  @ManyToOne(() => BlogEntity, (blog) => blog.likes, {
    onDelete: "CASCADE",
  })
  blog: BlogEntity;
}

export default BlogLikeEntity;
