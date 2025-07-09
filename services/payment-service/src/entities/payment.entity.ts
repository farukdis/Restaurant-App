// services/payment-service/src/entities/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
// import { Order } from '../../order-service/src/entities/order.entity'; // İsterseniz Order entity'sini direkt import edebilirsiniz.

export enum PaymentStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    PENDING = 'PENDING',
    REFUNDED = 'REFUNDED',
}

export enum PaymentMethod { // Order entity'sindeki ile aynı enum'ı kullanacağız
    CREDIT_CARD_ONLINE = 'CREDIT_CARD_ONLINE',
    CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
    CARD_ON_DELIVERY = 'CARD_ON_DELIVERY',
}

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // order_id UNIQUE NOT NULL olduğu için OneToOne ilişki kurabiliriz
    // Eğer order-service'teki Order entity'sini buraya import etmezsek,
    // sadece Column ile id'sini tutarız.
    @Column({ type: 'uuid', unique: true, nullable: false })
    order_id: string;

    // TypeORM ile OneToOne ilişkiyi tanımlamak için (eğer Order'ı import ediyorsak)
    // @OneToOne(() => Order, order => order.payment)
    // @JoinColumn({ name: 'order_id' })
    // order: Order;

    @Column({ length: 255, unique: true, nullable: true })
    transaction_id: string; // Ödeme ağ geçidinden gelen işlem ID'si

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
    amount: number;

    @Column({ length: 10, default: 'TRY' })
    currency: string;

    @Column({ type: 'enum', enum: PaymentMethod, nullable: false })
    payment_method: PaymentMethod;

    @Column({ type: 'enum', enum: PaymentStatus, nullable: false })
    status: PaymentStatus;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    payment_date: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}