import { Module } from "@nestjs/common";
import { BaseEntity } from "./base.entity";

@Module({
  imports: [],
  controllers: [],
  providers: [BaseEntity],
  exports: [BaseEntity],
})
export class SuperchargerModule {}
