// services/payment-service/src/payment/payment.controller.ts
import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto'; // YENİ


@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get(':transactionId/status')
    async getStatus(@Param('transactionId') transactionId: string) {
        const status = await this.paymentService.getPaymentStatus(transactionId);
        return { status };
    }

    @Post('webhook/:paymentGatewayId')
    @HttpCode(HttpStatus.OK)
    async handleWebhook(
        @Param('paymentGatewayId') paymentGatewayId: string,
        @Body() webhookData: any,
    ) {
        return this.paymentService.handlePaymentWebhook(webhookData);
    }

    // YENİ: Ödeme oluşturma endpoint'i
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.createPayment(createPaymentDto);
    }
}