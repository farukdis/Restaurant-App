import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Product } from '../entities/product.entity'; // Product entity'sini import et

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

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

    // **YENİ: Tüm ürünleri listeleyen endpoint eklendi**
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
}