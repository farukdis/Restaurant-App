// services/restaurant-service/src/restaurant/restaurant.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('') // Ön ek boş bırakıldı, global ön ek yeterli
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    // Plan: GET /api/restaurant/working-hours
    @Get('working-hours')
    async getWorkingHours() {
        return this.restaurantService.getWorkingHours();
    }

    // Plan: GET /api/restaurant/delivery-zones
    @Get('delivery-zones')
    async getDeliveryZones() {
        return this.restaurantService.getDeliveryZones();
    }
}