import UserEntity from "../user/user.entity";
import { BlogStatus } from "./enums/blog.enum";
import type { Id } from "src/common/types/entity.type";
import { EntityName } from "src/common/enums/entity.enum";
import BlogLikeEntity from "../blog-like/blog-like.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";
import BlogBookmarkEntity from "../blog-bookmark/blog-bookmark.entity";

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity(EntityName.Blog)
class BlogEntity extends BaseEntity {
  @Column("varchar", { length: 200, unique: true })
  title: string;

  @Column("varchar", { length: 400, name: "short_description" })
  shortDescription: string;

  @Column("varchar", { length: 1000 })
  description: string;

  @Column("enum", { enum: BlogStatus })
  status: BlogStatus;

  @Column("varchar", { length: 70, name: "image_name", nullable: true })
  imageName?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column("int", { name: "author_id" })
  authorId: Id;

  @JoinColumn({ name: "author_id" })
  @ManyToOne(() => UserEntity, (user) => user.blogs, { onDelete: "CASCADE" })
  author: UserEntity;

  @OneToMany(() => BlogLikeEntity, (like) => like.blog, {
    nullable: true,
    onDelete: "SET NULL",
  })
  likes?: BlogLikeEntity[];

  @OneToMany(() => BlogBookmarkEntity, (bookmark) => bookmark.blog, {
    nullable: true,
    onDelete: "SET NULL",
  })
  bookmarks?: BlogBookmarkEntity[];
}

export default BlogEntity;
