import { Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    // Kullanıcının kimliğini JWT token'ından alacağız. Şimdilik sabit bir kullanıcı kimliği kullanıyoruz.
    private getDummyUserId(): string {
        return 'user-uuid-123'; // Bu, daha sonra JWT'den gelecek
    }

    // Plan: POST /orders (Sipariş Oluştur)
    @Post()
    async createOrder() {
        const userId = this.getDummyUserId();
        return this.orderService.createOrderFromCart(userId);
    }

    // Plan: GET /orders/me (Siparişlerim) - Henüz servise eklenmedi
    @Get('me')
    async getMyOrders() {
        // Bu metodu daha sonra OrderService'e ekleyeceğiz
        return { message: 'This endpoint will list your orders.' };
    }

    // Plan: GET /orders/me/{order_id} (Tek Sipariş Detayı) - Henüz servise eklenmedi
    @Get('me/:orderId')
    async getOrderDetails(@Param('orderId') orderId: string) {
        // Bu metodu daha sonra OrderService'e ekleyeceğiz
        return { message: `This endpoint will get details for order ID: ${orderId}` };
    }

    // Plan: PATCH /orders/me/{order_id}/cancel (Sipariş İptali) - Henüz servise eklenmedi
    @Patch('me/:orderId/cancel')
    async cancelOrder(@Param('orderId') orderId: string) {
        // Bu metodu daha sonra OrderService'e ekleyeceğiz
        return { message: `This endpoint will cancel order ID: ${orderId}` };
    }
}