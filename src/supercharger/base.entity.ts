import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiResponseProperty({ type: 'number' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: string;

  @ApiResponseProperty({ type: 'string', format: 'date' })
  @CreateDateColumn()
  created?: Date;

  @ApiResponseProperty({ type: 'string', format: 'date' })
  @UpdateDateColumn()
  updated?: Date;
}
