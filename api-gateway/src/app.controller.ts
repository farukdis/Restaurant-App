import { Controller, Get, Post, Body, Req, Put, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('api/auth') // Tüm auth ilgili rotalar /api/auth altında olacak
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Mevcut test-auth endpoint'i korunuyor
  @Get('test-auth')
  async testAuthService(): Promise<any> {
    // Burada path boş bırakılıyor, çünkü auth-service'in kök dizinine istek atıyoruz
    return this.appService.proxyRequest('auth-service', 3001, 'GET', '');
  }

  // Auth Service'deki /register endpoint'ini yansıtıyoruz
  @Post('register')
  async registerUser(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'register', body);
  }

  // Auth Service'deki /login endpoint'ini yansıtıyoruz
  @Post('login')
  async loginUser(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'login', body);
  }

  // Auth Service'deki /users/me endpoint'ini yansıtıyoruz (GET)
  @Get('users/me')
  async getMyProfile(@Req() req: Request): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'GET', 'users/me', null, req.headers);
  }

  // Auth Service'deki /users/me endpoint'ini yansıtıyoruz (PUT)
  @Put('users/me')
  async updateMyProfile(@Req() req: Request, @Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'PUT', 'users/me', body, req.headers);
  }

  // Auth Service'deki /users/me/password endpoint'ini yansıtıyoruz (PATCH)
  @Patch('users/me/password')
  async changeMyPassword(@Req() req: Request, @Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'PATCH', 'users/me/password', body, req.headers);
  }

  // Auth Service'deki /forgot-password endpoint'ini yansıtıyoruz
  @Post('forgot-password')
  async forgotPassword(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'forgot-password', body);
  }

  // Auth Service'deki /reset-password endpoint'ini yansıtıyoruz
  @Post('reset-password')
  async resetPassword(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'reset-password', body);
  }
}