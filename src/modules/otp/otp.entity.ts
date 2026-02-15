import UserEntity from "../user/entities/user.entity";
import type { Id } from "src/common/types/entity.type";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";

import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

@Entity(EntityName.Otp)
class OtpEntity extends BaseEntity {
  @Column("varchar", { length: 5, unique: true })
  public code: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  public expiresAt: Date;

  @Column("int", { name: "user_id", unique: true })
  public userId: Id;

  @CreateDateColumn({ name: "last_sent_at" })
  public lastSentAt: Date;

  @Column("timestamp without time zone", {
    name: "last_failed_at",
    nullable: true,
  })
  public lastFailedAt?: Date;

  @Column("timestamp without time zone", {
    name: "last_verified_at",
    nullable: true,
  })
  public lastVerifiedAt?: Date;

  @Column("int", { default: 1, name: "total_requests" })
  public totalRequests: number;

  @Column("int", { default: 0, name: "total_failed_attempts" })
  public totalFailedAttempts: number;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
  public user: UserEntity;
}

export default OtpEntity;
