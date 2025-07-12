import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { WorkingHours } from '../entities/working-hours.entity';
import { DeliveryZone } from '../entities/delivery-zone.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(WorkingHours)
        private workingHoursRepository: Repository<WorkingHours>,
        @InjectRepository(DeliveryZone)
        private deliveryZonesRepository: Repository<DeliveryZone>,
    ) { }

    // Plan: GET /restaurant/working-hours
    async getWorkingHours(): Promise<WorkingHours[]> {
        return this.workingHoursRepository.find();
    }

    // Plan: GET /restaurant/delivery-zones
    async getDeliveryZones(): Promise<DeliveryZone[]> {
        return this.deliveryZonesRepository.find();
    }
}