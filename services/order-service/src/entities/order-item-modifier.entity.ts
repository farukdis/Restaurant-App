// services/order-service/src/entities/order-item-modifier.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
// import { ModifierOption } from '../../menu-service/src/entities/modifier-option.entity'; // Eğer doğrudan import edecekseniz, yolu kontrol edin

@Entity('order_item_modifiers')
export class OrderItemModifier {
    // Kompozit anahtar
    @PrimaryColumn({ type: 'uuid' })
    order_item_id: string;

    @PrimaryColumn({ type: 'uuid' })
    modifier_option_id: string;

    // İlişki: Bir modifiye edici bir sipariş öğesine aittir
    @ManyToOne(() => OrderItem, orderItem => orderItem.order_item_modifiers)
    @JoinColumn({ name: 'order_item_id' }) // order_item_id sütununu belirtiyoruz
    orderItem: OrderItem;

    // modifier_option_id, modifier_options tablosuna referans veriyor. (menu-service'ten gelecek)
    // @ManyToOne(() => ModifierOption, modifierOption => ...)
    // @JoinColumn({ name: 'modifier_option_id' })
    // modifierOption: ModifierOption;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price_impact: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}