// services/menu-service/src/entities/allergen.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductAllergen } from './product-allergen.entity'; // İleride oluşturacağız

@Entity('allergens') // Veritabanındaki tablo adı
export class Allergen {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string; // Alerjen adı (örn: 'Gluten', 'Laktoz', 'Fıstık')

    @Column({ type: 'text', nullable: true })
    description: string;

    // İlişki: Bir alerjen birden fazla ürün-alerjen ilişkisine sahip olabilir (OneToMany)
    @OneToMany(() => ProductAllergen, productAllergen => productAllergen.allergen)
    productAllergens: ProductAllergen[];
}