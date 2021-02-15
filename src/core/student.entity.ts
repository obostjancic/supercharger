import { BaseEntity } from "src/supercharger/base.entity";
import { Entity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("student")
export class Student extends BaseEntity {
  @ApiProperty({ type: "string" })
  @Column({ name: "name", type: "text" })
  name: string;
}
