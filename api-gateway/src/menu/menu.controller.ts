// api-gateway/src/menu/menu.controller.ts
import { Controller, Get, Post, Body, Req, Patch, Put, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { AppService } from '../app.service';
import { Request } from 'express';

@Controller('api/menu') // Bu kontrolcünün tüm rotaları /api/menu altında olacak
export class MenuController {
    constructor(private readonly appService: AppService) { }

    // MÜŞTERİ UÇ NOKTALARI
    @Get('categories')
    async findAllCategories(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', 'categories', null, req.headers);
    }

    @Get('categories/:categoryId/products')
    async findProductsByCategory(@Req() req: Request, @Param('categoryId') categoryId: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `categories/${categoryId}/products`, null, req.headers);
    }

    @Get('products')
    async findAllProducts(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', 'products', null, req.headers);
    }

    @Get('products/:productId')
    async findOneProduct(@Req() req: Request, @Param('productId') productId: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `products/${productId}`, null, req.headers);
    }

    // YÖNETİCİ UÇ NOKTALARI (ADMIN)
    @Post('admin/categories')
    async createCategory(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'POST', 'admin/categories', req.body, req.headers);
    }

    @Put('admin/categories/:id')
    async updateCategory(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'PUT', `admin/categories/${id}`, req.body, req.headers);
    }

    @Delete('admin/categories/:id')
    async deleteCategory(@Req() req: Request, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'DELETE', `admin/categories/${id}`, null, req.headers);
    }

    // TEST UÇ NOKTASI
    @Get('test-menu')
    async testMenuService(): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', 'test-menu');
    }
}