import { Controller, Get, Post, Body, Req, Patch, Put, Delete, Param, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from '../core/app.service';
import { Request } from 'express';

@Controller('api/menu')
export class MenuController {
    constructor(private readonly appService: AppService) { }

    // MÜŞTERİ UÇ NOKTALARI (GENEL KULLANICI İÇİN)
    @Get('categories')
    async findAllCategories(@Req() req: Request): Promise<any> {
        // Bu uç nokta için rota değişmedi
        return this.appService.proxyRequest('menu-service', 3002, 'GET', 'categories', null, req.headers);
    }

    @Get('categories/:categoryId/products')
    async findProductsByCategory(@Req() req: Request, @Param('categoryId') categoryId: string): Promise<any> {
        // Bu uç nokta için rota değişmedi
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `categories/${categoryId}/products`, null, req.headers);
    }

    @Get('products')
    async findAllProducts(@Req() req: Request): Promise<any> {
        // Bu uç nokta için rota değişmedi
        return this.appService.proxyRequest('menu-service', 3002, 'GET', 'products', null, req.headers);
    }

    @Get('products/:productId')
    async findOneProduct(@Req() req: Request, @Param('productId') productId: string): Promise<any> {
        // Bu uç nokta için rota değişmedi
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `products/${productId}`, null, req.headers);
    }

    // YÖNETİCİ UÇ NOKTALARI (ADMIN)

    // YENİ EKLENEN MENÜ UÇ NOKTALARI
    @Post('admin/restaurants/:restaurantId/menus')
    @HttpCode(HttpStatus.CREATED)
    async createMenu(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'POST', `admin/restaurants/${restaurantId}/menus`, req.body, req.headers);
    }

    @Get('admin/restaurants/:restaurantId/menus')
    async findAllMenus(@Req() req: Request, @Param('restaurantId') restaurantId: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `admin/restaurants/${restaurantId}/menus`, null, req.headers);
    }

    @Get('admin/restaurants/:restaurantId/menus/:id')
    async findOneMenu(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `admin/restaurants/${restaurantId}/menus/${id}`, null, req.headers);
    }

    @Put('admin/restaurants/:restaurantId/menus/:id')
    async updateMenu(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'PUT', `admin/restaurants/${restaurantId}/menus/${id}`, req.body, req.headers);
    }

    @Delete('admin/restaurants/:restaurantId/menus/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeMenu(@Req() req: Request, @Param('restaurantId') restaurantId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'DELETE', `admin/restaurants/${restaurantId}/menus/${id}`, null, req.headers);
    }

    // GÜNCELLENEN KATEGORİ UÇ NOKTALARI
    @Post('admin/menus/:menuId/categories')
    @HttpCode(HttpStatus.CREATED)
    async createCategory(@Req() req: Request, @Param('menuId') menuId: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'POST', `menus/${menuId}/categories`, req.body, req.headers);
    }

    @Get('admin/menus/:menuId/categories')
    async findCategoriesByMenu(@Req() req: Request, @Param('menuId') menuId: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `menus/${menuId}/categories`, null, req.headers);
    }

    @Get('admin/menus/:menuId/categories/:id')
    async findOneCategory(@Req() req: Request, @Param('menuId') menuId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', `menus/${menuId}/categories/${id}`, null, req.headers);
    }

    @Put('admin/menus/:menuId/categories/:id')
    async updateCategory(@Req() req: Request, @Param('menuId') menuId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'PUT', `menus/${menuId}/categories/${id}`, req.body, req.headers);
    }

    @Delete('admin/menus/:menuId/categories/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCategory(@Req() req: Request, @Param('menuId') menuId: string, @Param('id') id: string): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'DELETE', `menus/${menuId}/categories/${id}`, null, req.headers);
    }

    // TEST UÇ NOKTASI
    @Get('test-menu')
    async testMenuService(@Req() req: Request): Promise<any> {
        return this.appService.proxyRequest('menu-service', 3002, 'GET', 'test-menu');
    }
}