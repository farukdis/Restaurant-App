// services/payment-service/src/payment/payment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto'; // YENİ


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) { }

    async getPaymentStatus(transactionId: string): Promise<PaymentStatus> {
        const payment = await this.paymentRepository.findOne({ where: { transaction_id: transactionId } });
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        return payment.status;
    }

    async handlePaymentWebhook(webhookData: any): Promise<{ success: boolean }> {
        const transactionId = webhookData.transaction_id;
        const newStatus = webhookData.status as PaymentStatus;

        if (!transactionId || !newStatus) {
            return { success: false };
        }

        const result = await this.paymentRepository.update({ transaction_id: transactionId }, { status: newStatus });

        if (result.affected === 0) {
            return { success: false };
        }

        return { success: true };
    }

    // YENİ: Ödeme oluşturma metodu
    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const newPayment = this.paymentRepository.create(createPaymentDto);
        // Gerçek senaryoda bu transaction_id ödeme ağ geçidi tarafından gelir
        newPayment.transaction_id = `test-transaction-${Date.now()}`;
        newPayment.status = PaymentStatus.PENDING;

        return this.paymentRepository.save(newPayment);
    }
}