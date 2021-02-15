import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { generateOpenapiOptions } from "./supercharger/openapi.generator";
import { writeFileSync } from "fs";

const { exec } = require("child_process");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const options = generateOpenapiOptions();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("/docs", app, document, options.swaggerOptions);
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV !== "dev") {
    writeFileSync(`${process.cwd()}/openapi3.json`, JSON.stringify(document, null, 2));
    exec(
      `openapi-generator generate -i ${process.cwd()}/openapi3.json -g typescript-axios -o ${process.cwd()}/client/api`
    );
  }
  await app.listen(process.env.PORT || "3000");
}
bootstrap();
