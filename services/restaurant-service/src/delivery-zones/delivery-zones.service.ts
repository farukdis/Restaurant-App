// services/restaurant-service/src/delivery-zones/delivery-zones.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryZone } from '../entities/delivery-zone.entity';
import { CreateDeliveryZoneDto } from '../dto/create-delivery-zone.dto';
import { UpdateDeliveryZoneDto } from '../dto/update-delivery-zone.dto';

@Injectable()
export class DeliveryZonesService {
    constructor(
        @InjectRepository(DeliveryZone)
        private readonly deliveryZoneRepository: Repository<DeliveryZone>,
    ) { }

    // Yeni: Belirli bir restorana ait tüm teslimat bölgelerini bulma
    async findAllByRestaurantId(restaurantId: string): Promise<DeliveryZone[]> {
        return this.deliveryZoneRepository.findBy({ restaurant_id: restaurantId });
    }

    // Güncellendi: Restaurant ID'sini de alıyor
    async create(restaurantId: string, createDeliveryZoneDto: CreateDeliveryZoneDto): Promise<DeliveryZone> {
        const newDeliveryZone = this.deliveryZoneRepository.create({
            ...createDeliveryZoneDto,
            restaurant_id: restaurantId,
        });
        return this.deliveryZoneRepository.save(newDeliveryZone);
    }

    // Güncellendi: Restaurant ID'sini doğrulama için kullanıyor
    async update(restaurantId: string, id: string, updateDeliveryZoneDto: UpdateDeliveryZoneDto): Promise<DeliveryZone> {
        const deliveryZone = await this.deliveryZoneRepository.findOneBy({ id, restaurant_id: restaurantId });

        if (!deliveryZone) {
            throw new NotFoundException(`Delivery zone with ID "${id}" for restaurant "${restaurantId}" not found.`);
        }

        const updatedDeliveryZone = this.deliveryZoneRepository.merge(deliveryZone, updateDeliveryZoneDto);
        return this.deliveryZoneRepository.save(updatedDeliveryZone);
    }
}