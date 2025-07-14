import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) { }

    // Yeni restoran oluşturma
    async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
        return this.restaurantRepository.save(newRestaurant);
    }

    // Tüm restoranları listeleme
    async findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.find();
    }

    // Belirli bir restoranı ID'ye göre getirme
    async findOne(id: string): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOneBy({ id });
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID "${id}" not found.`);
        }
        return restaurant;
    }

    // Bir restoranı güncelleme
    async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        const restaurant = await this.findOne(id);
        this.restaurantRepository.merge(restaurant, updateRestaurantDto);
        return this.restaurantRepository.save(restaurant);
    }

    // Bir restoranı silme
    async remove(id: string): Promise<void> {
        const restaurant = await this.findOne(id);
        await this.restaurantRepository.remove(restaurant);
    }
}