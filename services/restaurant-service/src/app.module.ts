// services/restaurant-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity importları
import { Restaurant } from './entities/restaurant.entity';
import { WorkingHours } from './entities/working-hours.entity';
import { DeliveryZone } from './entities/delivery-zone.entity';
import { Setting } from './entities/setting.entity';
import { RestaurantModule } from './restaurant/restaurant.module'; // **YENİ: RestaurantModule import edildi**

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Bu satır, servis kendi .env dosyasını okuyacak
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Restaurant, WorkingHours, DeliveryZone, Setting],
        synchronize: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),
    RestaurantModule, // **YENİ: RestaurantModule eklendi**
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }