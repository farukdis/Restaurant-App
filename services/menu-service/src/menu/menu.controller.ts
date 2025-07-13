// menu-service/src/menu/menu.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    ParseUUIDPipe,
    Body,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';

@Controller('')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    // MÜŞTERİ UÇ NOKTALARI
    @Get('categories')
    async findAllCategories() {
        return this.menuService.findAllCategories();
    }

    @Get('categories/:categoryId/products')
    async findProductsByCategory(
        @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    ) {
        return this.menuService.findProductsByCategory(categoryId);
    }

    @Get('products')
    async findAllProducts(): Promise<Product[]> {
        return this.menuService.findAllProducts();
    }

    @Get('products/:productId')
    async findOneProduct(
        @Param('productId', new ParseUUIDPipe()) productId: string,
    ): Promise<Product> {
        return this.menuService.findOneProduct(productId);
    }

    // --- YENİ EKLENEN TEST UÇ NOKTASI ---
    @Get('test-menu')
    async testMenuService(): Promise<any> {
        return {
            message: 'Menu Service\'den başarıyla yanıt alındı!'
        };
    }

    // --- YÖNETİCİ UÇ NOKTALARI ---
    // Not: Bu uç noktalar için AuthGuard ve Roles Guard'lar sonra eklenecek.
    // Örneğin: @UseGuards(AuthGuard) @Roles('RESTAURANT_OWNER') gibi.

    @Post('admin/categories')
    async createCategory(@Body() categoryData: Partial<Category>): Promise<Category> {
        console.log('📥 Menü Servisi: POST kategorisi çağrıldı');
        console.log('Gelen Body:', categoryData);
        return this.menuService.createCategory(categoryData);
    }

    @Put('admin/categories/:id')
    async updateCategory(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() categoryData: Partial<Category>,
    ): Promise<Category> {
        return this.menuService.updateCategory(id, categoryData);
    }

    @Delete('admin/categories/:id')
    async deleteCategory(
        @Param('id', new ParseUUIDPipe()) id: string,
    ): Promise<void> {
        return this.menuService.deleteCategory(id);
    }
}