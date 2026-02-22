import UserEntity from "../user/user.entity";
import BlogEntity from "../blog/blog.entity";
import type { Id } from "src/common/types/entity.type";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

@Entity(EntityName.BlogComment)
class BlogCommentEntity extends BaseEntity {
  @Column("varchar", { length: 200 })
  text: string;

  @Column("boolean", { default: false, name: "is_verified" })
  isVerified: boolean;

  @Column("int", { name: "blog_id" })
  blogId: Id;

  @Column("int", { name: "user_id" })
  userId: Id;

  @Column("int", { name: "parent_id", nullable: true })
  parentId?: Id;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  //#region Relations

  @JoinColumn({ name: "parent_id" })
  @ManyToOne(() => BlogCommentEntity, (comment) => comment.children, {
    onDelete: "CASCADE",
    nullable: true,
  })
  parent?: BlogCommentEntity;

  @JoinColumn({ name: "parent" })
  @OneToMany(() => BlogCommentEntity, (comment) => comment.parent, {
    onDelete: "CASCADE",
    nullable: true,
  })
  children?: BlogCommentEntity[];

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  user: UserEntity;

  @JoinColumn({ name: "blog_id" })
  @ManyToOne(() => BlogEntity, (blog) => blog.comments, {
    onDelete: "CASCADE",
  })
  blog: BlogEntity;

  //#endregion
}

export default BlogCommentEntity;
