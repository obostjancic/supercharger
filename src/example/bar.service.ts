import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Bar } from './bar.entity';

@Injectable()
export class BarService extends TypeOrmCrudService<Bar> {
  constructor(@InjectRepository(Bar) repo) {
    super(repo);
  }
}
