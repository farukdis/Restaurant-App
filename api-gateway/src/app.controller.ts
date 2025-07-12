import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('test-auth')
  async testAuthService(): Promise<any> {
    return this.appService.getAuthServiceData();
  }

  // Bu endpoint'i ekliyoruz
  @Post('register-user')
  async registerUser(@Body() body: any): Promise<any> {
    return this.appService.registerUser(body);
  }
}