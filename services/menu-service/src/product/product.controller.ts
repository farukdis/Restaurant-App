// services/menu-service/src/product/product.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto'; // Yeni DTO'yu import edin
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

    @Put(':id') // Tam rota: PUT /admin/products/:id
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productService.update(id, updateProductDto);
    }
}