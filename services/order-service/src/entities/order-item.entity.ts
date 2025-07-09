// services/order-service/src/entities/order-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { OrderItemModifier } from './order-item-modifier.entity';
// import { Product } from '../../menu-service/src/entities/product.entity'; // Eğer doğrudan import edecekseniz, yolu kontrol edin

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // İlişki: Bir sipariş öğesi bir siparişe aittir
    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({ name: 'order_id' }) // order_id sütununu belirtiyoruz
    order: Order;

    @Column({ type: 'uuid' })
    order_id: string; // Foreign Key

    // product_id, products tablosuna referans veriyor. (menu-service'ten gelecek)
    @Column({ type: 'uuid' })
    product_id: string; // Foreign Key

    @Column('int')
    quantity: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    unit_price: number; // Sipariş anındaki ürün fiyatı

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir sipariş öğesinin birden fazla modifiye edicisi olabilir
    @OneToMany(() => OrderItemModifier, orderItemModifier => orderItemModifier.orderItem)
    order_item_modifiers: OrderItemModifier[];
}