// api-gateway/src/restaurant/restaurant.controller.ts

import { Controller, Post, Put, Param, Body, Req, Get } from '@nestjs/common';
import { AppService } from '../app.service'; // AppService'i import et
import { Request } from 'express';

@Controller('api/restaurant') // Bu kontrolcünün tüm rotaları /api/restaurant altında olacak
export class RestaurantController {
    constructor(private readonly appService: AppService) { } // AppService'i enjekte et

    // YÖNETİCİ UÇ NOKTALARI (ADMIN)
    @Post('admin/working-hours')
    async createWorkingHours(@Req() req: Request): Promise<any> {
        // AppService'in proxyRequest metodunu kullan
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', 'admin/working-hours', req.body, req.headers);
    }

    @Put('admin/working-hours/:id')
    async updateWorkingHours(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/working-hours/${id}`, req.body, req.headers);
    }

    // TEST UÇ NOKTASI
    @Get('test-restaurant')
    async testRestaurantService(@Req() req: Request): Promise<any> {
        // AppService'in proxyRequest metodunu kullan
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', 'test-restaurant', null, req.headers);
    }
}