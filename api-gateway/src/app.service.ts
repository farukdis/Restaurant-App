import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async getAuthServiceData(): Promise<any> {
    const url = 'http://auth-service:3001/api/auth';
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { timeout: 10000 })
      );
      return {
        message: 'Auth Service\'ten başarıyla yanıt alındı!',
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Auth Service Bağlantı Hatası:', error.message);
      if (error.response) {
        throw new HttpException(
          `Auth Service Hatası: ${JSON.stringify(error.response.data)}`,
          error.response.status
        );
      }
      throw new HttpException(
        `Auth Service Hatası: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Bu metodu ekliyoruz
  async registerUser(userData: any): Promise<any> {
    const url = 'http://auth-service:3001/api/auth/register';
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, userData, { timeout: 10000 })
      );
      return response.data;
    } catch (error: any) {
      console.error('Kayıt Hatası:', error.message);
      if (error.response) {
        throw new HttpException(
          `Kayıt Hatası: ${JSON.stringify(error.response.data)}`,
          error.response.status
        );
      }
      throw new HttpException(
        `Kayıt Hatası: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}