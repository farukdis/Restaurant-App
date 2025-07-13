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

    async create(createWorkingHoursDto: CreateWorkingHoursDto): Promise<WorkingHours> {
        const newWorkingHour = this.workingHoursRepository.create(createWorkingHoursDto);
        return this.workingHoursRepository.save(newWorkingHour);
    }

    async update(id: string, updateWorkingHoursDto: UpdateWorkingHoursDto): Promise<WorkingHours> {
        const workingHour = await this.workingHoursRepository.findOneBy({ id });

        if (!workingHour) {
            throw new NotFoundException(`WorkingHours with ID "${id}" not found.`);
        }

        const updatedWorkingHour = this.workingHoursRepository.merge(workingHour, updateWorkingHoursDto);
        return this.workingHoursRepository.save(updatedWorkingHour);
    }
}