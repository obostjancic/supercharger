import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Foo } from './foo.entity';

@Injectable()
export class FooService extends TypeOrmCrudService<Foo> {
  constructor(@InjectRepository(Foo) repo) {
    super(repo);
  }
}
