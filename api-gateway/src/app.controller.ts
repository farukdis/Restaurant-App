import { Controller, Get, Post, Body, Req, Patch, Put, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { AppService } from './core/app.service';
import { Request } from 'express';

@Controller('api') // Tüm auth ilgili rotalar /api/auth altında olacak
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Mevcut test-auth endpoint'i korunuyor
  @Get('auth/test-auth')
  async testAuthService(): Promise<any> {
    // Burada path boş bırakılıyor, çünkü auth-service'in kök dizinine istek atıyoruz
    return this.appService.proxyRequest('auth-service', 3001, 'GET', '');
  }

  // Auth Service'deki /register endpoint'ini yansıtıyoruz
  @Post('auth/register')
  async registerUser(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'register', body);
  }

  // Auth Service'deki /login endpoint'ini yansıtıyoruz
  @Post('auth/login')
  async loginUser(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'login', body);
  }

  // Auth Service'deki /users/me endpoint'ini yansıtıyoruz (GET)
  @Get('auth/users/me')
  async getMyProfile(@Req() req: Request): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'GET', 'users/me', null, req.headers);
  }

  // Auth Service'deki /users/me endpoint'ini yansıtıyoruz (PUT)
  @Put('auth/users/me')
  async updateMyProfile(@Req() req: Request, @Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'PUT', 'users/me', body, req.headers);
  }

  // Auth Service'deki /users/me/password endpoint'ini yansıtıyoruz (PATCH)
  @Patch('auth/users/me/password')
  async changeMyPassword(@Req() req: Request, @Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'PATCH', 'users/me/password', body, req.headers);
  }

  // Auth Service'deki /forgot-password endpoint'ini yansıtıyoruz
  @Post('auth/forgot-password')
  async forgotPassword(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'forgot-password', body);
  }

  // Auth Service'deki /reset-password endpoint'ini yansıtıyoruz
  @Post('auth/reset-password')
  async resetPassword(@Body() body: any): Promise<any> {
    return this.appService.proxyRequest('auth-service', 3001, 'POST', 'reset-password', body);
  }


}