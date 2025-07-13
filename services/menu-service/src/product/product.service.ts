// services/menu-service/src/product/product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = this.productRepository.create(createProductDto);
        return this.productRepository.save(newProduct);
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        // Ürünü veritabanından ID'sine göre bul ve DTO'daki verilerle birleştir
        const product = await this.productRepository.preload({
            id,
            ...updateProductDto,
        });

        if (!product) {
            throw new NotFoundException(`ID'si "${id}" olan ürün bulunamadı.`);
        }

        return this.productRepository.save(product);
    }
}