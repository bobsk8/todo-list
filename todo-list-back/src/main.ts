import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Client from './discovery/discovery.module';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Todo')
    .setDescription('The todo API description')
    .setVersion('1.0')
    //.addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  Client.logger.level('debug');
  Client.start(function (error) {
    console.log('start')
    console.log(error || 'complete');
  });

  await app.listen(3000);
}
bootstrap();