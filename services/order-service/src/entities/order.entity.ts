// services/order-service/src/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './order-item.entity'; // İlişki için OrderItem'ı import ediyoruz
//import { Payment } from './payment.entity'; // İlişki için Payment'ı import ediyoruz (ileride oluşturacağız)
import { Address } from './address.entity'; // İlişki için Address'i import ediyoruz
import { OrderStatusLog } from './order-status-log.entity'; // İlişki için OrderStatusLog'ı import ediyoruz (ileride oluşturacağız)
import { OrderStatus } from '../enums/order-status.enum'; // <-- BURAYI GÜNCELLEDİK! Artık enum'ı yeni yerden import ediyor


export enum DeliveryType {
    DELIVERY = 'DELIVERY', // Eve Teslimat
    PICKUP = 'PICKUP',     // Gel-Al
}

export enum PaymentMethod {
    CREDIT_CARD_ONLINE = 'CREDIT_CARD_ONLINE',
    CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
    CARD_ON_DELIVERY = 'CARD_ON_DELIVERY',
}



@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, unique: true, nullable: false })
    order_number: string; // Kullanıcıya gösterilen benzersiz sipariş numarası

    // user_id, users tablosuna referans veriyor. (auth-service'ten gelecek)
    @Column({ type: 'uuid', nullable: true })
    user_id: string;

    @Column({ length: 255, nullable: true })
    session_id: string; // Misafir siparişleri için oturum ID'si

    // İlişki: Bir sipariş bir adrese yapılır
    @ManyToOne(() => Address, address => address.orders, { nullable: true })
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @Column({ type: 'uuid', nullable: true })
    address_id: string; // Foreign Key

    @Column({ type: 'enum', enum: DeliveryType, nullable: false })
    delivery_type: DeliveryType;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
    total_amount: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
    delivery_fee: number;

    @Column({ type: 'enum', enum: PaymentMethod, nullable: false })
    payment_method: PaymentMethod;

    @Column({ type: 'enum', enum: OrderStatus, nullable: false })
    order_status: OrderStatus;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    order_date: Date; // Sipariş tarihi

    @Column({ type: 'timestamptz', nullable: true })
    estimated_delivery_time: Date;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişkiler:
    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[];

    @OneToMany(() => OrderStatusLog, orderStatusLog => orderStatusLog.order)
    status_logs: OrderStatusLog[];

    // Bir siparişin bir ödeme kaydı vardır (bu genellikle ManyToOne değil, OneToOne olur)
    // Ancak şemanızda order_id UNIQUE NOT NULL olduğu için OneToOne da uygun olur.
    // @OneToMany(() => Payment, payment => payment.order) // Payments'ın ManyToOne tarafında unique order_id olduğundan OneToMany kullanabiliriz.
    // payments: Payment[];
}