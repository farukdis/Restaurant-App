import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    // Plan: GET /menu/categories
    @Get('categories')
    async findAllCategories() {
        return this.menuService.findAllCategories();
    }

    // Plan: GET /menu/categories/{category_id}/products
    @Get('categories/:categoryId/products')
    async findProductsByCategory(
        @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    ) {
        return this.menuService.findProductsByCategory(categoryId);
    }

    // Plan: GET /menu/products/{product_id}
    @Get('products/:productId')
    async findOneProduct(
        @Param('productId', new ParseUUIDPipe()) productId: string,
    ) {
        return this.menuService.findOneProduct(productId);
    }
}