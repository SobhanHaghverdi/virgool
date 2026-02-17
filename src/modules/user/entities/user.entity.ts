import OtpEntity from "src/modules/otp/otp.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";
import UserProfileEntity from "src/modules/user-profile/user-profile.entity";

import {
  Column,
  Entity,
  OneToOne,
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
    name: "phone_number",
    length: 11,
    unique: true,
    nullable: true,
  })
  phoneNumber?: string;

  @Column("varchar", { length: 150, nullable: true })
  password?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => OtpEntity, (otp) => otp.user, {
    onDelete: "SET NULL",
    nullable: true,
  })
  otp?: OtpEntity;

  @OneToOne(() => UserProfileEntity, (profile) => profile.user, {
    nullable: true,
    onDelete: "SET NULL",
  })
  profile?: UserProfileEntity;
}

export default UserEntity;
