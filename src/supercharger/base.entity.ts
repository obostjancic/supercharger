import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiResponseProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseEntity {
  @ApiPropertyOptional({ type: 'number' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: string;

  @ApiPropertyOptional({ type: 'string', format: 'date' })
  @CreateDateColumn()
  created?: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date' })
  @UpdateDateColumn()
  updated?: Date;
}
