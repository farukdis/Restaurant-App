import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../entities/cart-item.entity'; // **Düzeltme: CartItem import edildi**

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        private readonly cartService: CartService,
    ) { }

    async createOrderFromCart(userId: string): Promise<Order> {
        const cart = await this.cartService.findOrCreateCart(userId);

        if (!cart || cart.cart_items.length === 0) { // **Düzeltme: 'items' yerine 'cart_items' kullanıldı**
            throw new NotFoundException('Your cart is empty.');
        }

        const newOrder = this.orderRepository.create({
            user_id: userId,
        });

        await this.orderRepository.save(newOrder);

        const orderItems = cart.cart_items.map((cartItem: CartItem) => { // **Düzeltme: 'items' yerine 'cart_items' kullanıldı ve cartItem'a tip eklendi**
            return this.orderItemRepository.create({
                order: newOrder,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
            });
        });

        await this.orderItemRepository.save(orderItems);

        await this.cartService.clearCart(userId);

        return newOrder;
    }
}