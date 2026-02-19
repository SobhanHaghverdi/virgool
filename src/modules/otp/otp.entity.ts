import { AuthMethod } from "../auth/enums/auth.enum";
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
  code: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  expiresAt: Date;

  @Column("int", { name: "user_id", unique: true })
  userId: Id;

  @CreateDateColumn({ name: "last_sent_at" })
  lastSentAt: Date;

  @Column("timestamp without time zone", {
    name: "last_failed_at",
    nullable: true,
  })
  lastFailedAt?: Date;

  @Column("timestamp without time zone", {
    name: "last_verified_at",
    nullable: true,
  })
  lastVerifiedAt?: Date;

  @Column("int", { default: 1, name: "total_requests" })
  totalRequests: number;

  @Column("int", { default: 0, name: "total_failed_attempts" })
  totalFailedAttempts: number;

  @Column("enum", { enum: AuthMethod })
  method: AuthMethod;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
  user: UserEntity;
}

export default OtpEntity;
