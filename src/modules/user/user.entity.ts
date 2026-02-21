import BlogEntity from "../blog/blog.entity";
import OtpEntity from "src/modules/otp/otp.entity";
import { EntityName } from "src/common/enums/entity.enum";
import BlogLikeEntity from "../blog-like/blog-like.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";
import BlogBookmarkEntity from "../blog-bookmark/blog-bookmark.entity";
import UserProfileEntity from "src/modules/user-profile/user-profile.entity";

import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity(EntityName.User)
class UserEntity extends BaseEntity {
  @Column("varchar", {
    name: "user_name",
    length: 150,
    unique: true,
    nullable: true,
  })
  userName?: string;

  @Column("varchar", { length: 150, unique: true, nullable: true })
  email?: string;

  @Column("varchar", {
    length: 150,
    unique: true,
    nullable: true,
    name: "pending_email",
  })
  pendingEmail?: string | null;

  @Column("varchar", {
    length: 11,
    unique: true,
    nullable: true,
    name: "pending_phone_number",
  })
  pendingPhoneNumber?: string | null;

  @Column("varchar", {
    name: "phone_number",
    length: 11,
    unique: true,
    nullable: true,
  })
  phoneNumber?: string;

  @Column("varchar", { length: 150, nullable: true })
  password?: string;

  @Column("bool", { default: false, name: "is_email_verified" })
  isEmailVerified: boolean;

  @Column("bool", { default: false, name: "is_phone_number_verified" })
  isPhoneNumberVerified: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => OtpEntity, (otp) => otp.user, {
    onDelete: "SET NULL",
    nullable: true,
  })
  otps?: OtpEntity[];

  @OneToOne(() => UserProfileEntity, (profile) => profile.user, {
    nullable: true,
    onDelete: "SET NULL",
  })
  profile?: UserProfileEntity;

  @OneToMany(() => BlogEntity, (blog) => blog.author, {
    nullable: true,
    onDelete: "SET NULL",
  })
  blogs?: BlogEntity[];

  @OneToMany(() => BlogLikeEntity, (like) => like.user, {
    nullable: true,
    onDelete: "SET NULL",
  })
  likes?: BlogLikeEntity[];

  @OneToMany(() => BlogBookmarkEntity, (bookmark) => bookmark.user, {
    nullable: true,
    onDelete: "SET NULL",
  })
  bookmarks?: BlogBookmarkEntity[];
}

export default UserEntity;
