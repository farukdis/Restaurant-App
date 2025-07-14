import { Controller, Get, Post, Put, Delete, Body, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';

@Controller('admin/restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    // POST /api/restaurant/admin/restaurants
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.create(createRestaurantDto);
    }

    // GET /api/restaurant/admin/restaurants
    @Get()
    async findAll() {
        return this.restaurantService.findAll();
    }

    // GET /api/restaurant/admin/restaurants/{id}
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.restaurantService.findOne(id);
    }

    // PUT /api/restaurant/admin/restaurants/{id}
    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        return this.restaurantService.update(id, updateRestaurantDto);
    }

    // DELETE /api/restaurant/admin/restaurants/{id}
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.restaurantService.remove(id);
    }
}