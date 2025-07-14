// api-gateway/src/restaurant/restaurant.controller.ts

import { Controller, Post, Put, Param, Body, Req, Get, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from '../core/app.service';
import { Request } from 'express';

@Controller('api/restaurant')
export class RestaurantController {
    constructor(private readonly appService: AppService) { }

    // RESTAURANT CRUD UÇ NOKTALARI (Yeni Eklendi)
    @Post('admin/restaurants')
    @HttpCode(HttpStatus.CREATED)
    async createRestaurant(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', `admin/restaurants`, req.body, req.headers);
    }

    @Get('admin/restaurants')
    async findAllRestaurants(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants`, null, req.headers);
    }

    @Get('admin/restaurants/:id')
    async findOneRestaurant(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants/${id}`, null, req.headers);
    }

    @Put('admin/restaurants/:id')
    async updateRestaurant(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/restaurants/${id}`, req.body, req.headers);
    }

    @Delete('admin/restaurants/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeRestaurant(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'DELETE', `admin/restaurants/${id}`, null, req.headers);
    }

    // WORKING HOURS UÇ NOKTALARI
    @Get('admin/restaurants/:restaurantId/working-hours')
    async getWorkingHours(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants/${restaurantId}/working-hours`, null, req.headers);
    }

    @Post('admin/restaurants/:restaurantId/working-hours')
    @HttpCode(HttpStatus.CREATED) // POST için CREATED status kodu eklendi
    async createWorkingHours(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', `admin/restaurants/${restaurantId}/working-hours`, req.body, req.headers);
    }

    @Put('admin/restaurants/:restaurantId/working-hours/:id')
    async updateWorkingHours(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/restaurants/${restaurantId}/working-hours/${id}`, req.body, req.headers);
    }

    // DELIVERY ZONES UÇ NOKTALARI
    @Get('admin/restaurants/:restaurantId/delivery-zones')
    async getDeliveryZones(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants/${restaurantId}/delivery-zones`, null, req.headers);
    }

    @Post('admin/restaurants/:restaurantId/delivery-zones')
    @HttpCode(HttpStatus.CREATED) // POST için CREATED status kodu eklendi
    async createDeliveryZone(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', `admin/restaurants/${restaurantId}/delivery-zones`, req.body, req.headers);
    }

    @Put('admin/restaurants/:restaurantId/delivery-zones/:id')
    async updateDeliveryZone(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/restaurants/${restaurantId}/delivery-zones/${id}`, req.body, req.headers);
    }

    // SETTINGS UÇ NOKTALARI
    @Get('admin/restaurants/:restaurantId/settings')
    async getSettings(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `admin/restaurants/${restaurantId}/settings`, null, req.headers);
    }

    @Post('admin/restaurants/:restaurantId/settings')
    @HttpCode(HttpStatus.CREATED)
    async createSetting(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'POST', `admin/restaurants/${restaurantId}/settings`, req.body, req.headers);
    }

    @Put('admin/restaurants/:restaurantId/settings/:keyName')
    async updateSetting(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('keyName') keyName: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'PUT', `admin/restaurants/${restaurantId}/settings/${keyName}`, req.body, req.headers);
    }

    @Delete('admin/restaurants/:restaurantId/settings/:keyName')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteSetting(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('keyName') keyName: string): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'DELETE', `admin/restaurants/${restaurantId}/settings/${keyName}`, null, req.headers);
    }

    // TEST UÇ NOKTASI
    @Get('test-restaurant')
    async testRestaurantService(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('restaurant-service', 3005, 'GET', `test-restaurant`, null, req.headers);
    }
}