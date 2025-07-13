// api-gateway/src/restaurant/restaurant.controller.ts

import { Controller, Post, Put, Param, Body, Req, Get } from '@nestjs/common';
import { AppService } from '../core/app.service';
import { Request } from 'express';

@Controller('api/restaurant')
export class RestaurantController {
    constructor(private readonly appService: AppService) { }

    // WORKING HOURS UÇ NOKTALARI
    @Get('admin/restaurants/:restaurantId/working-hours')
    async getWorkingHours(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants/${restaurantId}/working-hours`, null, req.headers);
    }

    @Post('admin/restaurants/:restaurantId/working-hours')
    async createWorkingHours(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', `admin/restaurants/${restaurantId}/working-hours`, req.body, req.headers);
    }

    @Put('admin/restaurants/:restaurantId/working-hours/:id')
    async updateWorkingHours(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('id') id: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/restaurants/${restaurantId}/working-hours/${id}`, req.body, req.headers);
    }

    // DELIVERY ZONES UÇ NOKTALARI
    @Get('admin/restaurants/:restaurantId/delivery-zones')
    async getDeliveryZones(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants/${restaurantId}/delivery-zones`, null, req.headers);
    }

    @Post('admin/restaurants/:restaurantId/delivery-zones')
    async createDeliveryZone(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', `admin/restaurants/${restaurantId}/delivery-zones`, req.body, req.headers);
    }

    @Put('admin/restaurants/:restaurantId/delivery-zones/:id')
    async updateDeliveryZone(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('id') id: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/restaurants/${restaurantId}/delivery-zones/${id}`, req.body, req.headers);
    }

    // RESTAURANT INFO UÇ NOKTALARI (SETTINGS)
    @Get('admin/restaurants/settings/restaurant-info/:restaurantId')
    async getRestaurantInfo(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants/settings/restaurant-info/${restaurantId}`, null, req.headers);
    }

    @Put('admin/restaurants/settings/restaurant-info/:restaurantId')
    async updateRestaurantInfo(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/restaurants/settings/restaurant-info/${restaurantId}`, req.body, req.headers);
    }

    // TEST UÇ NOKTASI
    @Get('test-restaurant')
    async testRestaurantService(@Req() req: Request): Promise<any> {
        // Ön ek artık proxyRequest'ten gelmiyor
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `test-restaurant`, null, req.headers);
    }
}