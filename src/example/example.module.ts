import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarController } from './bar.controller';
import { FooController } from './foo.controller';
import { Bar } from './bar.entity';
import { BarService } from './bar.service';
import { SuperchargerModule } from 'src/supercharger/supercharger.module';
import { Foo } from './foo.entity';
import { FooService } from './foo.service';

@Module({
  imports: [SuperchargerModule, TypeOrmModule.forFeature([Bar, Foo])],
  controllers: [BarController, FooController],
  providers: [BarService, FooService],
})
export class CoreModule {}
