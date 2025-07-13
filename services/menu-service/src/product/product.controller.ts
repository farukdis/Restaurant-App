// services/menu-service/src/product/product.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, ParseUUIDPipe, NotFoundException, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from '../entities/product.entity';

@Controller('admin/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Put(':id')
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id') // Tam rota: DELETE /admin/products/:id
    @HttpCode(HttpStatus.NO_CONTENT) // Silme işlemi başarılı olursa 204 No Content döner
    async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.productService.remove(id);
    }
}