// api-gateway/src/restaurant/restaurant.controller.ts

import { Controller, Post, Put, Param, Body, Req, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { Request } from 'express';

@Controller('api/restaurant') // Bu kontrolcünün tüm rotaları /api/restaurant altında olacak
export class RestaurantController {
    constructor(private readonly appService: AppService) { }

    // WORKING HOURS UÇ NOKTALARI
    @Post('admin/working-hours')
    async createWorkingHours(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', 'admin/working-hours', req.body, req.headers);
    }

    @Put('admin/working-hours/:id')
    async updateWorkingHours(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/working-hours/${id}`, req.body, req.headers);
    }

    // DELIVERY ZONES UÇ NOKTALARI
    @Post('admin/delivery-zones')
    async createDeliveryZone(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', 'admin/delivery-zones', req.body, req.headers);
    }

    @Put('admin/delivery-zones/:id')
    async updateDeliveryZone(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/delivery-zones/${id}`, req.body, req.headers);
    }

    // TEST UÇ NOKTASI
    @Get('test-restaurant')
    async testRestaurantService(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', 'test-restaurant', null, req.headers);
    }
}