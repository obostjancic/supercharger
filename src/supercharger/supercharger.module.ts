import { INestApplication, Module } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { generateOpenapi } from './openapi.generator';

@Module({
  imports: [],
  controllers: [],
  providers: [BaseEntity],
  exports: [BaseEntity],
})
export class SuperchargerModule {
  static generateOpenapiDocs(app: INestApplication): void {
    generateOpenapi(app);
  }
}
