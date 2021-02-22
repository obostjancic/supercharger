import { CrudController } from '@nestjsx/crud';
import { Controller } from 'src/supercharger/controller.decorator';
import { Foo } from './foo.entity';
import { FooService } from './foo.service';

@Controller(Foo)
export class FooController implements CrudController<Foo> {
  constructor(public service: FooService) {}
}
