import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/supercharger/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bars')
export class Bar extends BaseEntity {
  @Column({ name: 'temp', type: 'int' })
  @ApiProperty({ name: 'temp', type: 'number', minimum: 0, maximum: 100 })
  temp: number;
}
