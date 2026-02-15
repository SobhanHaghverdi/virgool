import type { Id } from "../types/entity.type";
import { PrimaryGeneratedColumn } from "typeorm";

class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id: Id;
}

export { BaseEntity };
