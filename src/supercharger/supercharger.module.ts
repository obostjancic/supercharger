import { Module } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { generateOpenapi } from './openapi.generator';
import { RedocModule } from 'nestjs-redoc';

@Module({
  imports: [RedocModule],
  controllers: [],
  providers: [BaseEntity],
  exports: [BaseEntity],
})
export class SuperchargerModule {
  static generateOpenapiDocs(app) {
    generateOpenapi(app);
  }
}
