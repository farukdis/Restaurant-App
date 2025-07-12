// services/order-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Yeni oluşturduğumuz entity'leri import ediyoruz
import { Address } from './entities/address.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartItemModifier } from './entities/cart-item-modifier.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemModifier } from './entities/order-item-modifier.entity';
import { OrderStatusLog } from './entities/order-status-log.entity';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Address,
          Cart,
          CartItem,
          CartItemModifier,
          Order,
          OrderItem,
          OrderItemModifier,
          OrderStatusLog
        ],
        synchronize: true,
        retryAttempts: 10, // **YENİ: Retry mekanizması eklendi**
        retryDelay: 3000, // **YENİ: Retry mekanizması eklendi**
      }),
      inject: [ConfigService],
    }),
    CartModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }