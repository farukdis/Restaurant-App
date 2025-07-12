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

    // Planımızdaki ilk endpoint için metot
    async findAllCategories() {
        return this.categoriesRepository.find({
            where: { is_active: true },
            order: { order_index: 'ASC' },
        });
    }

    // Planımızdaki ikinci endpoint için metot
    async findProductsByCategory(categoryId: string) {
        // Kategoriye ait aktif ürünleri is_available'ı true olanları getirelim
        return this.productsRepository.find({
            where: { category: { id: categoryId }, is_available: true },
            // İlişkileri de getirmek için gerekli ayarları burada yapabiliriz.
        });
    }

    // Planımızdaki üçüncü endpoint için metot
    async findOneProduct(productId: string) {
        // Ürünü ilişkili verilerle (modifiers, allergens) getirelim
        const product = await this.productsRepository.findOne({
            where: { id: productId },
            relations: ['allergens', 'modifiers', 'modifiers.modifierOptions'],
        });

        if (!product) {
            throw new NotFoundException(`Product with ID "${productId}" not found.`);
        }

        return product;
    }
}