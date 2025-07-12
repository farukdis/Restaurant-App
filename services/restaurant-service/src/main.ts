import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('RESTAURANT_SERVICE_PORT') || 3005;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Veritabanı bağlantısı için bekleme mekanizması
  const dataSource = app.get(DataSource);
  let isConnected = false;
  let attempts = 0;
  const maxAttempts = 10;
  const delay = 3000;

  while (!isConnected && attempts < maxAttempts) {
    try {
      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }
      isConnected = true;
      console.log('Database connection successful!');
    } catch (error) {
      attempts++;
      console.error(`Database connection failed. Attempt ${attempts}/${maxAttempts}. Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  if (!isConnected) {
    console.error('Failed to connect to the database after multiple attempts. Exiting.');
    process.exit(1);
  }

  await app.listen(port);
  console.log(`Restaurant Service listening on port ${port}`);
}

bootstrap();