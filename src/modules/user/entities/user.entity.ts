import OtpEntity from "./otp.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";

import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity(EntityName.User)
class UserEntity extends BaseEntity {
  @Column("varchar", { name: "user_name", length: 150, unique: true })
  public userName: string;

  @Column("varchar", { length: 150, unique: true, nullable: true })
  public email?: string;

  @Column("varchar", {
    name: "phone_number",
    length: 11,
    unique: true,
    nullable: true,
  })
  public phoneNumber?: string;

  @Column("varchar", { length: 150, nullable: true })
  public password?: string;

  @Column("int", { name: "otp_id", nullable: true })
  public otpId?: number;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;

  @JoinColumn({ name: "otp_id" })
  @OneToOne(() => OtpEntity, (otp) => otp.user, {
    onDelete: "SET NULL",
    nullable: true,
  })
  public otp?: OtpEntity;
}

export default UserEntity;
