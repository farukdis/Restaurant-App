// services/order-service/src/order/order.module.ts
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cart } from '../entities/cart.entity';
import { CartModule } from '../cart/cart.module';
import { TestController } from '../test/test.controller'; // **YENİ**

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            OrderItem,
            Cart
        ]),
        HttpModule,
        CartModule,
    ],
    controllers: [OrderController, TestController], // **DEĞİŞTİ**
    providers: [OrderService],
})
export class OrderModule { }