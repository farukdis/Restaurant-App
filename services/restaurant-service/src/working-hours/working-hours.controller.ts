// services/restaurant-service/src/working-hours/working-hours.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, ParseUUIDPipe, Get } from '@nestjs/common';
import { WorkingHoursService } from './working-hours.service';
import { CreateWorkingHoursDto } from '../dto/create-working-hours.dto';
import { UpdateWorkingHoursDto } from '../dto/update-working-hours.dto';
import { WorkingHours } from '../entities/working-hours.entity';

@Controller('admin/restaurants/:restaurantId/working-hours')
export class WorkingHoursController {
    constructor(private readonly workingHoursService: WorkingHoursService) { }

    // Yeni: Belirli bir restoranın tüm çalışma saatlerini getirme
    @Get()
    @HttpCode(HttpStatus.OK)
    async getWorkingHours(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    ): Promise<WorkingHours[]> {
        return this.workingHoursService.findAllByRestaurantId(restaurantId);
    }

    // Yeni: Belirli bir restoran için çalışma saati oluşturma
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createWorkingHour(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Body() createWorkingHoursDto: CreateWorkingHoursDto,
    ): Promise<WorkingHours> {
        return this.workingHoursService.create(restaurantId, createWorkingHoursDto);
    }

    // Güncellendi: Belirli bir restoranın çalışma saatini güncelleme
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateWorkingHour(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateWorkingHoursDto: UpdateWorkingHoursDto,
    ): Promise<WorkingHours> {
        return this.workingHoursService.update(restaurantId, id, updateWorkingHoursDto);
    }
}