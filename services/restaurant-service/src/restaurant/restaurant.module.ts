// services/restaurant-service/src/restaurant/restaurant.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { WorkingHoursController } from '../working-hours/working-hours.controller'; // Çalışma saatleri kontrolcüsünü ekle
import { WorkingHoursService } from '../working-hours/working-hours.service'; // Çalışma saatleri servisini ekle

// Daha önce oluşturduğunuz entity'leri import edin
import { Restaurant } from '../entities/restaurant.entity';
import { WorkingHours } from '../entities/working-hours.entity';
import { DeliveryZone } from '../entities/delivery-zone.entity';
import { Setting } from '../entities/setting.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant, WorkingHours, DeliveryZone, Setting]),
    ],
    controllers: [
        RestaurantController,
        WorkingHoursController // Buraya kontrolcüyü ekliyoruz
    ],
    providers: [
        RestaurantService,
        WorkingHoursService // Buraya servisi ekliyoruz
    ],
    exports: [RestaurantService],
})
export class RestaurantModule { }