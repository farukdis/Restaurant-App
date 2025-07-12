// services/payment-service/src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from '../entities/payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Payment])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule { }