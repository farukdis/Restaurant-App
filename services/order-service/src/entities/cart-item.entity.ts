// services/order-service/src/entities/cart-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItemModifier } from './cart-item-modifier.entity'; // İlişki için CartItemModifier'ı import ediyoruz
// import { Product } from '../../menu-service/src/entities/product.entity'; // Eğer doğrudan import edecekseniz, yolu kontrol edin

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // İlişki: Bir sepet öğesi bir sepete aittir
    @ManyToOne(() => Cart, cart => cart.cart_items)
    @JoinColumn({ name: 'cart_id' }) // cart_id sütununu belirtiyoruz
    cart: Cart;

    @Column({ type: 'uuid' })
    cart_id: string; // Foreign Key

    // product_id, products tablosuna referans veriyor.
    // products tablosu menu-service'te olduğu için doğrudan Foreign Key tanımlaması yapmıyoruz.
    // İlişkiyi servisler arası iletişim ile yöneteceğiz.
    @Column({ type: 'uuid' })
    product_id: string; // Foreign Key

    @Column('int')
    quantity: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    unit_price: number;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // İlişki: Bir sepet öğesinin birden fazla modifiye edicisi olabilir
    @OneToMany(() => CartItemModifier, cartItemModifier => cartItemModifier.cartItem)
    cart_item_modifiers: CartItemModifier[];
}