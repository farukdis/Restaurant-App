// services/menu-service/src/entities/product-modifier.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Modifier } from './modifier.entity';

@Entity('product_modifiers') // Veritabanındaki tablo adı
export class ProductModifier {
    @PrimaryColumn({ type: 'uuid', name: 'product_id' })
    product_id: string;

    @PrimaryColumn({ type: 'uuid', name: 'modifier_id' })
    modifier_id: string;

    // İlişki: Bir ürün-modifiye edici ilişkisi bir ürüne aittir (ManyToOne)
    @ManyToOne(() => Product, product => product.productModifiers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    // İlişki: Bir ürün-modifiye edici ilişkisi bir modifiye edici grubuna aittir (ManyToOne)
    @ManyToOne(() => Modifier, modifier => modifier.productModifiers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'modifier_id' })
    modifier: Modifier;
}