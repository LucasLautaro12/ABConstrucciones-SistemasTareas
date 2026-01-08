import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const puerto = configService.get<number>('PORT',3000);
  await app.listen(puerto);

  Logger.log(`El server está corriendo en el puerto: ${puerto}`)
}
bootstrap();
