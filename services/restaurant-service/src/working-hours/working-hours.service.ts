// services/restaurant-service/src/working-hours/working-hours.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkingHours } from '../entities/working-hours.entity';
import { CreateWorkingHoursDto } from '../dto/create-working-hours.dto';
import { UpdateWorkingHoursDto } from '../dto/update-working-hours.dto';

@Injectable()
export class WorkingHoursService {
    constructor(
        @InjectRepository(WorkingHours)
        private readonly workingHoursRepository: Repository<WorkingHours>,
    ) { }

    // Yeni: Belirli bir restorana ait tüm çalışma saatlerini bulma
    async findAllByRestaurantId(restaurantId: string): Promise<WorkingHours[]> {
        return this.workingHoursRepository.findBy({ restaurant_id: restaurantId });
    }

    // Güncellendi: Restaurant ID'sini de alıyor
    async create(restaurantId: string, createWorkingHoursDto: CreateWorkingHoursDto): Promise<WorkingHours> {
        const newWorkingHour = this.workingHoursRepository.create({
            ...createWorkingHoursDto,
            restaurant_id: restaurantId,
        });
        return this.workingHoursRepository.save(newWorkingHour);
    }

    // Güncellendi: Restaurant ID'sini doğrulama için kullanıyor
    async update(restaurantId: string, id: string, updateWorkingHoursDto: UpdateWorkingHoursDto): Promise<WorkingHours> {
        const workingHour = await this.workingHoursRepository.findOneBy({ id, restaurant_id: restaurantId });

        if (!workingHour) {
            throw new NotFoundException(`WorkingHours with ID "${id}" for restaurant "${restaurantId}" not found.`);
        }

        const updatedWorkingHour = this.workingHoursRepository.merge(workingHour, updateWorkingHoursDto);
        return this.workingHoursRepository.save(updatedWorkingHour);
    }
}