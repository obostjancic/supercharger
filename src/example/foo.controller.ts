import { CrudController } from '@nestjsx/crud';
import { Controller } from 'src/supercharger/controller.decorator';
import { Foo } from './foo.entity';
import { FooService } from './foo.service';
import { Get, InternalServerErrorException } from '@nestjs/common';

@Controller(Foo)
export class FooController implements CrudController<Foo> {
  constructor(public service: FooService) {}

  @Get('/break')
  public async breakStuff() {
    throw new InternalServerErrorException('Broken');
  }
}
