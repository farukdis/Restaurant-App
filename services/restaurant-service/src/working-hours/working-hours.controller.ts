// services/restaurant-service/src/working-hours/working-hours.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { WorkingHoursService } from './working-hours.service';
import { CreateWorkingHoursDto } from '../dto/create-working-hours.dto';
import { UpdateWorkingHoursDto } from '../dto/update-working-hours.dto';
import { WorkingHours } from '../entities/working-hours.entity';

@Controller('admin/working-hours')
export class WorkingHoursController {
    constructor(private readonly workingHoursService: WorkingHoursService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createWorkingHour(@Body() createWorkingHoursDto: CreateWorkingHoursDto): Promise<WorkingHours> {
        return this.workingHoursService.create(createWorkingHoursDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateWorkingHour(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateWorkingHoursDto: UpdateWorkingHoursDto,
    ): Promise<WorkingHours> {
        return this.workingHoursService.update(id, updateWorkingHoursDto);
    }
}