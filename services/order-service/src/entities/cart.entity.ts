// services/order-service/src/entities/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CartItem } from './cart-item.entity'; // İlişki için CartItem'ı import ediyoruz

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // user_id, users tablosuna referans veriyor.
    // users tablosu auth-service'te olduğu için doğrudan Foreign Key tanımlaması yapmıyoruz.
    // İlişkiyi servisler arası iletişim ile yöneteceğiz.
    @Column({ type: 'uuid', nullable: true })
    user_id: string;

    @Column({ length: 255, unique: true, nullable: true })
    session_id: string; // Misafir kullanıcılar için oturum ID'si

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir sepetin birden fazla sepet öğesi olabilir
    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cart_items: CartItem[];
}