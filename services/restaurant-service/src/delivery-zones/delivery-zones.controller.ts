// services/restaurant-service/src/delivery-zones/delivery-zones.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeliveryZonesService } from './delivery-zones.service';
import { CreateDeliveryZoneDto } from '../dto/create-delivery-zone.dto';
import { UpdateDeliveryZoneDto } from '../dto/update-delivery-zone.dto';
import { DeliveryZone } from '../entities/delivery-zone.entity';

@Controller('admin/delivery-zones')
export class DeliveryZonesController {
    constructor(private readonly deliveryZonesService: DeliveryZonesService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createDeliveryZone(@Body() createDeliveryZoneDto: CreateDeliveryZoneDto): Promise<DeliveryZone> {
        return this.deliveryZonesService.create(createDeliveryZoneDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateDeliveryZone(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateDeliveryZoneDto: UpdateDeliveryZoneDto,
    ): Promise<DeliveryZone> {
        return this.deliveryZonesService.update(id, updateDeliveryZoneDto);
    }
}