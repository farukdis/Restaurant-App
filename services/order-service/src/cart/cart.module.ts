import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

// Sepet yönetimi için gerekli entity'leri import ediyoruz
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { CartItemModifier } from '../entities/cart-item-modifier.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Cart,
            CartItem,
            CartItemModifier,
        ]),
        HttpModule,
    ],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService],
})
export class CartModule { } // **ÖNEMLİ: export anahtar kelimesinin burada olduğundan emin olun.**