// services/menu-service/src/entities/modifier-option.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Modifier } from './modifier.entity';
import { ProductModifier } from './product-modifier.entity'; // İleride oluşturacağız

@Entity('modifier_options') // Veritabanındaki tablo adı
export class ModifierOption {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'modifier_id', nullable: false })
    modifier_id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    option_name: string; // Seçenek adı (örn: 'Az Acılı', 'Orta', 'Çok Acılı', 'Ekstra Peynir')

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
    price_impact: number; // Fiyata etkisi (pozitif veya negatif)

    @Column({ type: 'int', default: 0 })
    order_index: number; // Seçeneklerin sıralaması

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir seçenek bir modifiye edici grubuna aittir (ManyToOne)
    @ManyToOne(() => Modifier, modifier => modifier.modifierOptions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'modifier_id' })
    modifier: Modifier;

    // Not: Şemanızda modifier_options ile product_modifiers arasında ManyToMany ilişkisi belirtilmiş.
    // Ancak product_modifiers bir ara tablo olarak tanımlandığı için,
    // ProductModifier entity'sinde ManyToOne ilişkilerini kuracağız.
    // Burada ManyToMany kullanırsak TypeORM otomatik ara tablo oluşturur ki bu sizin tanımınızla çelişir.
    // Bu nedenle burada doğrudan bir ManyToMany ilişkisi tanımlamıyoruz.
}