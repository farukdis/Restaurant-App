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

    async create(createDeliveryZoneDto: CreateDeliveryZoneDto): Promise<DeliveryZone> {
        const newDeliveryZone = this.deliveryZoneRepository.create(createDeliveryZoneDto);
        return this.deliveryZoneRepository.save(newDeliveryZone);
    }

    async update(id: string, updateDeliveryZoneDto: UpdateDeliveryZoneDto): Promise<DeliveryZone> {
        const deliveryZone = await this.deliveryZoneRepository.findOneBy({ id });

        if (!deliveryZone) {
            throw new NotFoundException(`Delivery zone with ID "${id}" not found.`);
        }

        const updatedDeliveryZone = this.deliveryZoneRepository.merge(deliveryZone, updateDeliveryZoneDto);
        return this.deliveryZoneRepository.save(updatedDeliveryZone);
    }
}