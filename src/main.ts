import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PokéScan API')
    .setDescription('The PokéScan API')
    .setVersion('1.0.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  };

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    config,
    options
  );

  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
