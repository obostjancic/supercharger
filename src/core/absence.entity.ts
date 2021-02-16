import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/supercharger/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('absences')
export class Absence extends BaseEntity {
  @Column({ name: 'temp', type: 'int' })
  @ApiProperty({ name: 'temp', type: 'number' })
  temp: number;
}
