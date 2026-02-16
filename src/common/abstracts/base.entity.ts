import type { Id } from "../types/entity.type";
import { PrimaryGeneratedColumn } from "typeorm";

class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: Id;
}

export { BaseEntity };
