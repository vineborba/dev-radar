import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  const cs = app.get(ConfigService);
  const port = cs.get('OMNI_API_PORT');
  await app.listen(port);
}

bootstrap();
