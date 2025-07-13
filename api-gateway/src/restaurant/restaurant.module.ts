// api-gateway/src/restaurant/restaurant.module.ts

import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { CoreModule } from '../core/core.module'; // CoreModule'ü import et

@Module({
    imports: [CoreModule], // CoreModule'ü buraya ekle
    controllers: [RestaurantController],
    providers: [], // AppService artık CoreModule'den geliyor, buradan kaldır
})
export class RestaurantModule { }