import Gender from "./enums/gender.enum";
import { Column, Entity } from "typeorm";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity(EntityName.UserProfile)
class UserProfileEntity extends BaseEntity {
  @Column("varchar", { name: "nick_name", length: 150 })
  nickName: string;

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
}

export default UserProfileEntity;
