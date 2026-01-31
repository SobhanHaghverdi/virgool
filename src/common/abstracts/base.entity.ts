import { PrimaryGeneratedColumn } from "typeorm";

class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id: number;
}

export { BaseEntity };
