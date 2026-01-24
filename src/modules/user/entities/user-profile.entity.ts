import { Column, Entity } from "typeorm";
import { Gender } from "src/common/enums/user.enum";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity(EntityName.UserProfile)
class UserProfileEntity extends BaseEntity {
  @Column("varchar", { name: "nick_name", length: 150 })
  public nickName: string;

  @Column("varchar", { length: 200, nullable: true })
  public bio?: string;

  @Column("enum", { enum: Gender, nullable: true })
  public gender?: string;

  @Column("varchar", { name: "image_name", length: 50, nullable: true })
  public imageName?: string;

  @Column("varchar", {
    name: "background_image_name",
    length: 50,
    nullable: true,
  })
  public backgroundImageName?: string;

  @Column("time without time zone", { name: "birth_date", nullable: true })
  public birthDate?: Date;

  @Column("varchar", { name: "linkedin_profile", nullable: true, length: 150 })
  public linkedinProfile?: string;
}

export default UserProfileEntity;
