// services/restaurant-service/src/delivery-zones/delivery-zones.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryZonesController } from './delivery-zones.controller';
import { DeliveryZonesService } from './delivery-zones.service';
import { DeliveryZone } from '../entities/delivery-zone.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryZone])], // DeliveryZone varlığını TypeORM'a kaydet
    controllers: [DeliveryZonesController],
    providers: [DeliveryZonesService],
})
export class DeliveryZonesModule { }