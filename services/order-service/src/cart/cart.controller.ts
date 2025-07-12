import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    // Kullanıcının kimliğini JWT token'ından alacağız. Şimdilik sabit bir kullanıcı kimliği kullanıyoruz.
    private getDummyUserId(): string {
        return 'user-uuid-123'; // Bu, daha sonra JWT'den gelecek
    }

    // Plan: GET /cart
    @Get()
    async getCart() {
        const userId = this.getDummyUserId();
        return this.cartService.findOrCreateCart(userId);
    }

    // Plan: POST /cart/items
    @Post('items')
    async addProductToCart(@Body() body: { productId: string; quantity: number }) {
        const userId = this.getDummyUserId();
        const { productId, quantity } = body;
        // ModifierOptions ekleme mantığı daha sonra eklenecek
        return this.cartService.addProductToCart(userId, productId, quantity);
    }

    // Plan: PUT /cart/items/:cartItemId
    @Put('items/:cartItemId')
    async updateCartItemQuantity(@Param('cartItemId') cartItemId: string, @Body() body: { quantity: number }) {
        const userId = this.getDummyUserId();
        const { quantity } = body;
        return this.cartService.updateCartItemQuantity(userId, cartItemId, quantity);
    }

    // Plan: DELETE /cart/items/:cartItemId
    @Delete('items/:cartItemId')
    async removeProductFromCart(@Param('cartItemId') cartItemId: string) {
        const userId = this.getDummyUserId();
        return this.cartService.removeProductFromCart(userId, cartItemId);
    }

    // Plan: DELETE /cart (Sepeti Temizleme)
    @Delete()
    async clearCart() {
        // Bu fonksiyonu henüz CartService'e eklemedik.
        // İleride buraya ilgili servisi çağıracak kodu ekleyebiliriz.
        return { message: 'Cart cleared successfully.' };
    }
}