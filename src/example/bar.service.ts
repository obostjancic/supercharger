import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Bar } from './bar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BarService extends TypeOrmCrudService<Bar> {
  constructor(@InjectRepository(Bar) repo: Repository<Bar>) {
    super(repo);
  }
}
