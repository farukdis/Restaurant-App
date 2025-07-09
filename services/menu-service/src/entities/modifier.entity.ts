// services/menu-service/src/entities/modifier.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ModifierOption } from './modifier-option.entity'; // İleride oluşturacağız
import { ProductModifier } from './product-modifier.entity'; // İleride oluşturacağız

@Entity('modifiers') // Veritabanındaki tablo adı
export class Modifier {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string; // Grubun adı (örn: 'Acılık Seviyesi', 'Ekstra Malzemeler')

    @Column({ type: 'varchar', length: 50, nullable: false })
    type: string; // Seçim tipi (örn: 'SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'BOOLEAN')

    @Column({ type: 'boolean', default: false })
    is_required: boolean; // Bu grup zorunlu mu?

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir modifiye edici grubuna birden fazla seçenek ait olabilir (OneToMany)
    @OneToMany(() => ModifierOption, modifierOption => modifierOption.modifier)
    modifierOptions: ModifierOption[];

    // İlişki: Bir modifiye edici grubuna birden fazla ürün-modifiye edici ilişkisi ait olabilir (OneToMany)
    @OneToMany(() => ProductModifier, productModifier => productModifier.modifier)
    productModifiers: ProductModifier[];
}