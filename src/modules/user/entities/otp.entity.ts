import UserEntity from "./user.entity";
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

@Entity(EntityName.Otp)
class OtpEntity extends BaseEntity {
  @Column("varchar", { length: 5, unique: true })
  public code: string;

  @Column("timestamp without time zone", { name: "expires_at", nullable: true })
  public expiresAt?: Date;

  @Column("int", { name: "user_id" })
  public userId: number;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
  public user: UserEntity;
}

export default OtpEntity;
