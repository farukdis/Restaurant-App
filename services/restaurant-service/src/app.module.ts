// services/restaurant-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Restaurant } from './entities/restaurant.entity';
import { WorkingHours } from './entities/working-hours.entity';
import { DeliveryZone } from './entities/delivery-zone.entity';
import { Setting } from './entities/setting.entity';
import { DeliveryZonesModule } from './delivery-zones/delivery-zones.module'; // DeliveryZonesModule'ü import et

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
        entities: [Restaurant, WorkingHours, DeliveryZone, Setting],
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),
    RestaurantModule,
    DeliveryZonesModule, // DeliveryZonesModule'ü buraya ekle
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }