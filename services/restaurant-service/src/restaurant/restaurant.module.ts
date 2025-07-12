import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

// Daha önce oluşturduğunuz entity'leri import edin
import { Restaurant } from '../entities/restaurant.entity';
import { WorkingHours } from '../entities/working-hours.entity';
import { DeliveryZone } from '../entities/delivery-zone.entity';
import { Setting } from '../entities/setting.entity'; // **YENİ: Setting import edildi**

@Module({
    imports: [
        // Bu modülde kullanılacak entity'leri belirtiyoruz
        TypeOrmModule.forFeature([Restaurant, WorkingHours, DeliveryZone, Setting]), // **YENİ: Setting eklendi**
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService],
    exports: [RestaurantService],
})
export class RestaurantModule { }