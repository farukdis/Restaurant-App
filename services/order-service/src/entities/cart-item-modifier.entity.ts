// services/order-service/src/entities/cart-item-modifier.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';
// import { ModifierOption } from '../../menu-service/src/entities/modifier-option.entity'; // Eğer doğrudan import edecekseniz, yolu kontrol edin

@Entity('cart_item_modifiers')
export class CartItemModifier {
    // Bu tablo kompozit anahtar kullanıyor, bu yüzden @PrimaryGeneratedColumn kullanmıyoruz
    // Bunun yerine @PrimaryColumn ile anahtar parçalarını belirliyoruz.

    @PrimaryColumn({ type: 'uuid' })
    cart_item_id: string;

    @PrimaryColumn({ type: 'uuid' })
    modifier_option_id: string;

    // İlişki: Bir modifiye edici bir sepet öğesine aittir
    @ManyToOne(() => CartItem, cartItem => cartItem.cart_item_modifiers)
    @JoinColumn({ name: 'cart_item_id' }) // cart_item_id sütununu belirtiyoruz
    cartItem: CartItem;

    // modifier_option_id, modifier_options tablosuna referans veriyor.
    // modifier_options tablosu menu-service'te olduğu için doğrudan Foreign Key tanımlaması yapmıyoruz.
    // İlişkiyi servisler arası iletişim ile yöneteceğiz.
    // @ManyToOne(() => ModifierOption, modifierOption => ...) // Eğer direkt ilişki kursaydık böyle olurdu
    // @JoinColumn({ name: 'modifier_option_id' }) // modifier_option_id sütununu belirtiyoruz
    // modifierOption: ModifierOption;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price_impact: number; // Bu seçeneğin fiyata etkisi

    // Kompozit anahtar olduğunda CreateDateColumn/UpdateDateColumn doğrudan çalışmayabilir.
    // Ancak TypeORM'in son versiyonları bunu desteklemeli. Test etmekte fayda var.
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}