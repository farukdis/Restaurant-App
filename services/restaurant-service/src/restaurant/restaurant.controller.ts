import { Controller, Get } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    // Plan: GET /restaurant/working-hours
    @Get('working-hours')
    async getWorkingHours() {
        return this.restaurantService.getWorkingHours();
    }

    // Plan: GET /restaurant/delivery-zones
    @Get('delivery-zones')
    async getDeliveryZones() {
        return this.restaurantService.getDeliveryZones();
    }
}