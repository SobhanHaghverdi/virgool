import { Column, Entity } from "typeorm";
import { EntityName } from "src/common/enums/entity.enum";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity(EntityName.Category)
class CategoryEntity extends BaseEntity {
  @Column("varchar", { length: 150, unique: true })
  title: string;

  @Column("int", { nullable: true })
  priority?: number;
}

export default CategoryEntity;
