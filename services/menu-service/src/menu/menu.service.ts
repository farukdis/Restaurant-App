// menu-service/src/menu/menu.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entity'leri import ediyoruz
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Modifier } from '../entities/modifier.entity';
import { ModifierOption } from '../entities/modifier-option.entity';
import { Allergen } from '../entities/allergen.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Modifier)
        private modifiersRepository: Repository<Modifier>,
        @InjectRepository(ModifierOption)
        private modifierOptionsRepository: Repository<ModifierOption>,
        @InjectRepository(Allergen)
        private allergensRepository: Repository<Allergen>,
    ) { }

    // Mevcut metotlar korunuyor...
    async findAllCategories() {
        return this.categoriesRepository.find({
            where: { is_active: true },
            order: { order_index: 'ASC' },
        });
    }

    async findProductsByCategory(categoryId: string) {
        return this.productsRepository.find({
            where: { category: { id: categoryId }, is_available: true },
        });
    }

    async findOneProduct(productId: string) {
        const product = await this.productsRepository.findOne({
            where: { id: productId },
            relations: ['allergens', 'modifiers', 'modifiers.modifierOptions'],
        });

        if (!product) {
            throw new NotFoundException(`Product with ID "${productId}" not found.`);
        }

        return product;
    }

    async findAllProducts(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    // --- YENİ EKLENEN METOTLAR ---

    // Kategori ekleme metodu (Plan: POST /admin/categories)
    async createCategory(categoryData: Partial<Category>): Promise<Category> {
        const newCategory = this.categoriesRepository.create(categoryData);
        return this.categoriesRepository.save(newCategory);
    }

    // Kategori güncelleme metodu (Plan: PUT /admin/categories/{id})
    async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
        await this.categoriesRepository.update(id, categoryData);
        const updatedCategory = await this.categoriesRepository.findOne({ where: { id } });
        if (!updatedCategory) {
            throw new NotFoundException(`Category with ID "${id}" not found.`);
        }
        return updatedCategory;
    }

    // Kategori silme metodu (Plan: DELETE /admin/categories/{id})
    async deleteCategory(id: string): Promise<void> {
        const result = await this.categoriesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID "${id}" not found.`);
        }
    }
}