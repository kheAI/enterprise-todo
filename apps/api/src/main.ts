import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Global validation pipe — runs class-validator on every input automatically
  // forbidNonWhitelisted: reject unknown fields (prevents mass-assignment attacks)
  // whitelist: strip unknown fields before they reach handlers
  // transform: convert plain JSON objects to typed DTO class instances
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS — allow all origins in dev, restrict in production
  app.enableCors({
    origin:
      config.get('NODE_ENV') === 'development'
        ? '*'
        : process.env.ALLOWED_ORIGINS,
  });

  const port = config.get<number>('PROJECT_PORT') ?? 3333;
  await app.listen(port);

  console.log(`🚀 API running at http://localhost:${port}`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
