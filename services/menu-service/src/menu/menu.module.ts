import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

// Daha önce oluşturduğunuz entity'leri import edin
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Allergen } from '../entities/allergen.entity';
import { ProductAllergen } from '../entities/product-allergen.entity';
import { Modifier } from '../entities/modifier.entity';
import { ModifierOption } from '../entities/modifier-option.entity';
import { ProductModifier } from '../entities/product-modifier.entity';

@Module({
    imports: [
        // Menu modülünde kullanılacak entity'leri belirtiyoruz
        TypeOrmModule.forFeature([
            Category,
            Product,
            Allergen,
            ProductAllergen,
            Modifier,
            ModifierOption,
            ProductModifier,
        ]),
    ],
    controllers: [MenuController],
    providers: [MenuService],
    exports: [MenuService], // Diğer modüllerin bu servisi kullanabilmesi için dışa aktarıyoruz
})
export class MenuModule { }