import Gender from "./enums/gender.enum";
import UserEntity from "../user/entities/user.entity";
import type { Id } from "src/common/types/entity.type";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity(EntityName.UserProfile)
class UserProfileEntity extends BaseEntity {
  @Column("varchar", { name: "nick_name", length: 150, nullable: true })
  nickName?: string;

  @Column("varchar", { length: 200, nullable: true })
  bio?: string;

  @Column("enum", { enum: Gender, nullable: true })
  gender?: string;

  @Column("varchar", { name: "image_name", length: 50, nullable: true })
  imageName?: string;

  @Column("varchar", {
    name: "background_image_name",
    length: 50,
    nullable: true,
  })
  backgroundImageName?: string;

  @Column("timestamp without time zone", { name: "birth_date", nullable: true })
  birthDate?: Date;

  @Column("varchar", { name: "linkedin_profile", nullable: true, length: 150 })
  linkedinProfile?: string;

  @Column("varchar", { name: "x_profile", nullable: true, length: 150 })
  xProfile?: string;

  @Column("int", { name: "user_id", unique: true })
  userId: Id;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: "CASCADE" })
  user: UserEntity;
}

export default UserProfileEntity;
