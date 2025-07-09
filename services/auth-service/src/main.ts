import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ValidationPipe'ı import edin
import { ConfigService } from '@nestjs/config'; // ConfigService'i import edin (ortam değişkenlerine erişmek için)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ConfigService'i alın (env değişkenlerine erişim için)
  const configService = app.get(ConfigService);

  // Auth servisi için özel bir port belirleyelim (3001 olarak)
  // Eğer ortam değişkenlerinde AUTH_SERVICE_PORT varsa onu kullan, yoksa 3001 kullan
  const port = configService.get<number>('AUTH_SERVICE_PORT') || 3001;

  app.setGlobalPrefix('api/auth'); // Auth servisine özel global prefix (API Gateway ile uyumlu olacak)

  // Global ValidationPipe'ı etkinleştir
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO'da tanımlanmamış property'leri kaldırır
    forbidNonWhitelisted: true, // DTO'da tanımlanmamış property'ler gelirse hata fırlatır
    transform: true, // Gelen payload'ı DTO instance'ına dönüştürür
  }));

  await app.listen(port);
  console.log(`Auth Service listening on port ${port}`); // Servisin hangi portta çalıştığını loglayalım
}
bootstrap();