// services/order-service/src/entities/address.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity'; // İlişkiyi tanımlamak için Order entity'sini import ediyoruz

@Entity('addresses') // Tablo adını belirtiyoruz
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // users tablosu başka bir serviste (auth-service) olduğu için
    // doğrudan @ManyToOne kullanmak yerine sadece user_id'yi tutuyoruz.
    // Servisler arası iletişim ile user bilgisi alınacak.
    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ length: 255 })
    address_line1: string;

    @Column({ length: 255, nullable: true })
    address_line2: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    district: string;

    @Column({ length: 100, nullable: true })
    neighborhood: string;

    @Column({ length: 10, nullable: true })
    postal_code: string;

    @Column({ length: 100, nullable: true })
    address_title: string;

    @Column({ type: 'boolean', default: false })
    is_default: boolean;

    @Column({ type: 'numeric', precision: 10, scale: 7, nullable: true })
    latitude: number;

    @Column({ type: 'numeric', precision: 10, scale: 7, nullable: true })
    longitude: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişkiler: Bir adresin birden fazla siparişi olabilir
    @OneToMany(() => Order, order => order.address)
    orders: Order[];
}