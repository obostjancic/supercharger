import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuperchargerModule } from './supercharger/supercharger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  SuperchargerModule.generateOpenapiDocs(app);

  await app.listen(process.env.PORT || '3000');
}
bootstrap();
