// services/menu-service/src/entities/product-allergen.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Allergen } from './allergen.entity';

@Entity('product_allergens') // Veritabanındaki tablo adı
export class ProductAllergen {
    @PrimaryColumn({ type: 'uuid', name: 'product_id' })
    product_id: string;

    @PrimaryColumn({ type: 'uuid', name: 'allergen_id' })
    allergen_id: string;

    // İlişki: Bir ürün-alerjen ilişkisi bir ürüne aittir (ManyToOne)
    @ManyToOne(() => Product, product => product.productAllergens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    // İlişki: Bir ürün-alerjen ilişkisi bir alerjene aittir (ManyToOne)
    @ManyToOne(() => Allergen, allergen => allergen.productAllergens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'allergen_id' })
    allergen: Allergen;
}