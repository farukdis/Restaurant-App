// services/restaurant-service/src/delivery-zones/delivery-zones.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, ParseUUIDPipe, Get } from '@nestjs/common';
import { DeliveryZonesService } from './delivery-zones.service';
import { CreateDeliveryZoneDto } from '../dto/create-delivery-zone.dto';
import { UpdateDeliveryZoneDto } from '../dto/update-delivery-zone.dto';
import { DeliveryZone } from '../entities/delivery-zone.entity';

@Controller('admin/restaurants/:restaurantId/delivery-zones')
export class DeliveryZonesController {
    constructor(private readonly deliveryZonesService: DeliveryZonesService) { }

    // Yeni: Belirli bir restoranın tüm teslimat bölgelerini getirme
    @Get()
    @HttpCode(HttpStatus.OK)
    async getDeliveryZones(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    ): Promise<DeliveryZone[]> {
        return this.deliveryZonesService.findAllByRestaurantId(restaurantId);
    }

    // Yeni: Belirli bir restoran için teslimat bölgesi oluşturma
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createDeliveryZone(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Body() createDeliveryZoneDto: CreateDeliveryZoneDto,
    ): Promise<DeliveryZone> {
        return this.deliveryZonesService.create(restaurantId, createDeliveryZoneDto);
    }

    // Güncellendi: Belirli bir restoranın teslimat bölgesini güncelleme
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateDeliveryZone(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateDeliveryZoneDto: UpdateDeliveryZoneDto,
    ): Promise<DeliveryZone> {
        return this.deliveryZonesService.update(restaurantId, id, updateDeliveryZoneDto);
    }
}