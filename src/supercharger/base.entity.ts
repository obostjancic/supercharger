import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @ApiPropertyOptional({ type: 'number', minimum: 0, maximum: 100000 })
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: string;

  @ApiPropertyOptional({ type: 'string', format: 'date' })
  @CreateDateColumn()
  created?: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date' })
  @UpdateDateColumn()
  updated?: Date;
}
