import { Controller, Get, Post, Body, Req, Patch, Param, Delete } from '@nestjs/common';
import { AppService } from '../app.service';
import { Request } from 'express';

@Controller('api/menu')
export class MenuController {
    constructor(private readonly appService: AppService) { }

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
}