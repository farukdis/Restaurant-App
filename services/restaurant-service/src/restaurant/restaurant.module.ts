// services/restaurant-service/src/restaurant/restaurant.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from '../entities/restaurant.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant]),
    ],
    controllers: [
        RestaurantController,
    ],
    providers: [
        RestaurantService,
    ],
    exports: [RestaurantService],
})
export class RestaurantModule { }