// services/restaurant-service/src/app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-restaurant') // Bu uç nokta API Gateway'den gelen isteği karşılayacak
  getTest(): string {
    return 'Merhaba, restaurant-service çalışıyor!';
  }
}