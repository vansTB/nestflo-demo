import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const envFilePath = path.join(__dirname, '..', `.env`);
  require('dotenv').config({ path: envFilePath });
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.APP_PORT || '3000'));
}
bootstrap();
