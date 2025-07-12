// services/payment-service/src/payment/dto/create-payment.dto.ts
import { IsUUID, IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../entities/payment.entity';

export class CreatePaymentDto {
    @IsUUID()
    order_id: string;

    @IsNumber()
    amount: number;

    @IsEnum(PaymentMethod)
    payment_method: PaymentMethod;
}