import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Foo } from './foo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FooService extends TypeOrmCrudService<Foo> {
  constructor(@InjectRepository(Foo) repo: Repository<Foo>) {
    super(repo);
  }
}
