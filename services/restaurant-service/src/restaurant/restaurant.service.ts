// services/restaurant-service/src/restaurant/restaurant.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) { }

    // Restoran temel bilgilerini getirme
    async getRestaurantInfo(id: string): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOneBy({ id });
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID "${id}" not found.`);
        }
        return restaurant;
    }

    // Restoran temel bilgilerini güncelleme
    async updateRestaurantInfo(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOneBy({ id });
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID "${id}" not found.`);
        }
        const updatedRestaurant = this.restaurantRepository.merge(restaurant, updateRestaurantDto);
        return this.restaurantRepository.save(updatedRestaurant);
    }
}