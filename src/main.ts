import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const url = configService.get<string>('url');
  const port = configService.get<number>('port');
  await app.listen(port);
  Logger.log(`🚀 Listening HTTP at ${url}`, 'HTTP');
}

bootstrap();
