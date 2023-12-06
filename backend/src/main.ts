import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JWTAuthGuard } from './common/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JWTAuthGuard(reflector));
  await app.listen(3000);
}
bootstrap();
