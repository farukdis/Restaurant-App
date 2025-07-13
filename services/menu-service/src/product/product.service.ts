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
        const product = await this.productRepository.preload({
            id,
            ...updateProductDto,
        });

        if (!product) {
            throw new NotFoundException(`ID'si "${id}" olan ürün bulunamadı.`);
        }

        return this.productRepository.save(product);
    }

    async remove(id: string): Promise<void> {
        const result = await this.productRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`ID'si "${id}" olan ürün bulunamadı.`);
        }
    }
}