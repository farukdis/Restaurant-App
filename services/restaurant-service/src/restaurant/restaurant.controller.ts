// services/restaurant-service/src/restaurant/restaurant.controller.ts

import { Controller, Get, Put, Body, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';

@Controller('admin/restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    // GET /api/restaurant/admin/restaurants/settings/restaurant-info/{restaurantId}
    @Get('settings/restaurant-info/:restaurantId')
    async getRestaurantInfo(@Param('restaurantId') restaurantId: string) {
        return this.restaurantService.getRestaurantInfo(restaurantId);
    }

    // PUT /api/restaurant/admin/restaurants/settings/restaurant-info/{restaurantId}
    @Put('settings/restaurant-info/:restaurantId')
    @HttpCode(HttpStatus.OK)
    async updateRestaurantInfo(@Param('restaurantId') restaurantId: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        return this.restaurantService.updateRestaurantInfo(restaurantId, updateRestaurantDto);
    }
}