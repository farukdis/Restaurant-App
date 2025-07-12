import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  // test-auth endpoint'i için kullanılacak metod
  async getAuthServiceRoot(): Promise<any> {
    const url = 'http://auth-service:3001/api/auth'; // Auth service'in ana yolu
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { timeout: 10000 })
      );
      return {
        message: 'Auth Service\'in ana yolundan başarıyla yanıt alındı!',
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Auth Service Kök Bağlantı Hatası:', error.message);
      if (error.response) {
        throw new HttpException(
          `Auth Service Kök Hatası: ${JSON.stringify(error.response.data)}`,
          error.response.status
        );
      }
      throw new HttpException(
        `Auth Service Kök Hatası: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Auth Service'in tüm endpoint'leri için genel proxy metodu
  async proxyAuthRequest(method: string, path: string, body?: any, headers?: any): Promise<any> {
    const url = `http://auth-service:3001/api/auth/${path}`; // Auth service'in temel URL'i

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: method as any,
          url,
          data: body,
          headers: {
            ...headers, // Gelen tüm başlıkları (Authorization gibi) ilet
            host: 'auth-service:3001', // Host başlığını yeniden yazmak önemlidir
          },
          timeout: 10000,
        }),
      );
      return response.data;
    } catch (error: any) {
      console.error(`Proxy Hatası (${method} ${path}):`, error.message);
      if (error.response) {
        // Hedef servisten gelen hata yanıtını doğrudan ilet
        throw new HttpException(
          `Hata: ${JSON.stringify(error.response.data)}`,
          error.response.status
        );
      }
      // Ağ veya diğer genel hatalar için
      throw new HttpException(
        `Ulaşılamıyor: ${error.message}`,
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}