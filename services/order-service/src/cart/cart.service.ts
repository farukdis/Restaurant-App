import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { CartItemModifier } from '../entities/cart-item-modifier.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        @InjectRepository(CartItemModifier)
        private cartItemModifierRepository: Repository<CartItemModifier>,
        private readonly httpService: HttpService,
    ) { }

    async findOrCreateCart(userId: string): Promise<Cart> {
        let cart = await this.cartRepository.findOne({
            where: { user_id: userId },
            relations: ['cart_items', 'cart_items.itemModifiers'], // **Düzeltme: 'items' yerine 'cart_items' kullanıldı**
        });

        if (!cart) {
            cart = this.cartRepository.create({ user_id: userId });
            await this.cartRepository.save(cart);
        }

        return cart;
    }

    async addProductToCart(
        userId: string,
        productId: string,
        quantity: number,
    ): Promise<Cart> {
        const cart = await this.findOrCreateCart(userId);

        try {
            const { data: product } = await firstValueFrom(
                this.httpService.get(`http://menu-service:3002/menu/products/${productId}`)
            );

            if (!product) {
                throw new NotFoundException(`Product with ID "${productId}" not found.`);
            }

            const existingCartItem = await this.cartItemRepository.findOne({
                where: { cart: { id: cart.id }, product_id: product.id },
            });

            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                await this.cartItemRepository.save(existingCartItem);
            } else {
                const newCartItem = this.cartItemRepository.create({
                    cart: cart,
                    product_id: product.id,
                    quantity: quantity,
                });
                await this.cartItemRepository.save(newCartItem);
            }

            return this.findOrCreateCart(userId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to add product to cart due to an external service error.');
        }
    }

    async removeProductFromCart(userId: string, cartItemId: string): Promise<Cart> {
        const cart = await this.findOrCreateCart(userId);
        const cartItem = await this.cartItemRepository.findOne({
            where: { id: cartItemId, cart: { id: cart.id } },
        });

        if (!cartItem) {
            throw new NotFoundException(`Cart item with ID "${cartItemId}" not found in your cart.`);
        }

        await this.cartItemRepository.remove(cartItem);

        return this.findOrCreateCart(userId);
    }

    async updateCartItemQuantity(userId: string, cartItemId: string, quantity: number): Promise<Cart> {
        const cart = await this.findOrCreateCart(userId);
        const cartItem = await this.cartItemRepository.findOne({
            where: { id: cartItemId, cart: { id: cart.id } },
        });

        if (!cartItem) {
            throw new NotFoundException(`Cart item with ID "${cartItemId}" not found in your cart.`);
        }

        cartItem.quantity = quantity;
        await this.cartItemRepository.save(cartItem);

        return this.findOrCreateCart(userId);
    }

    async clearCart(userId: string): Promise<void> {
        const cart = await this.cartRepository.findOne({ where: { user_id: userId }, relations: ['cart_items'] }); // **Düzeltme: 'items' yerine 'cart_items' kullanıldı**
        if (cart) {
            await this.cartItemRepository.remove(cart.cart_items); // **Düzeltme: 'items' yerine 'cart_items' kullanıldı**
        }
    }
}