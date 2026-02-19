import { Module } from "@nestjs/common";
import AuthModule from "../auth/auth.module";
import CategoryEntity from "./category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import CategoryService from "./category.service";
import CategoryController from "./category.controller";

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [AuthModule, TypeOrmModule.forFeature([CategoryEntity])],
})
class CategoryModule {}

export default CategoryModule;
