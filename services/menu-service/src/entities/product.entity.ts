// services/menu-service/src/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';
import { ProductAllergen } from './product-allergen.entity';
import { ProductModifier } from './product-modifier.entity';

@Entity('products') // Veritabanındaki tablo adı
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'uuid', name: 'category_id', nullable: false })
    category_id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url: string;

    @Column({ type: 'boolean', default: true })
    is_available: boolean; // Stok durumu veya o an satışta mı?

    @Column({ type: 'boolean', default: true })
    is_active: boolean; // Ürün müşterilere görünür mü?

    @Column({ type: 'int', default: 0 })
    order_index: number; // Kategori içindeki sıralama

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir ürün bir kategoriye aittir (ManyToOne)
    @ManyToOne(() => Category, category => category.products, { onDelete: 'RESTRICT' }) // Kategori silinirse ürünler kalır
    @JoinColumn({ name: 'category_id' })
    category: Category;

    // İlişki: Ürün Alerjenleri (çoktan-çoğa ilişki için ara tablo)
    @OneToMany(() => ProductAllergen, productAllergen => productAllergen.product)
    productAllergens: ProductAllergen[];

    // İlişki: Ürün Modifiye Edicileri (çoktan-çoğa ilişki için ara tablo)
    @OneToMany(() => ProductModifier, productModifier => productModifier.product)
    productModifiers: ProductModifier[];

    // Not: Eğer product_allergens ve product_modifiers tablolarını manuel olarak yönetmek yerine
    // TypeORM'in ManyToMany ilişkisini kullanmak isterseniz, bu kısımlar değişecektir.
    // Ancak sizin şemanızda ara tablolar açıkça belirtildiği için OneToMany kullanıyoruz.
}