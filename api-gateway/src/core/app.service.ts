// api-gateway/src/core/app.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async proxyRequest(targetService: string, port: number, method: string, path: string, body?: any, headers?: any): Promise<any> {
    const serviceName = targetService.replace('-service', '');
    const url = `http://${targetService}:${port}/api/${serviceName}/${path}`;

    const proxyHeaders = { ...headers };
    delete proxyHeaders['content-length'];

    // Sadece POST, PUT, PATCH gibi methodlarda Content-Type ayarla
    const methodsWithBody = ['POST', 'PUT', 'PATCH'];
    if (methodsWithBody.includes(method.toUpperCase())) {
      if (!proxyHeaders['content-type']) {
        proxyHeaders['content-type'] = 'application/json';
      }
    } else {
      // Body'si olmayan isteklerde body parametresini null yap
      body = null;
    }

    proxyHeaders['host'] = `${targetService}:${port}`;

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: method as any,
          url,
          data: body,
          headers: proxyHeaders,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error: any) {
      console.error(`Proxy Hatası (${method} ${path}):`, error.message);
      if (error.response) {
        throw new HttpException(
          `Hata: ${JSON.stringify(error.response.data)}`,
          error.response.status
        );
      }
      throw new HttpException(
        `Ulaşılamıyor: ${error.message}`,
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}