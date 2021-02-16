import { CrudController } from '@nestjsx/crud';
import { Controller } from 'src/supercharger/controller.decorator';
import { Bar } from './Bar.entity';
import { BarService } from './Bar.service';

@Controller(Bar)
export class BarController implements CrudController<Bar> {
  constructor(public service: BarService) {}
}
