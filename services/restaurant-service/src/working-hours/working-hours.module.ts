// services/restaurant-service/src/working-hours/working-hours.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHoursController } from './working-hours.controller';
import { WorkingHoursService } from './working-hours.service';
import { WorkingHours } from '../entities/working-hours.entity';

@Module({
    imports: [TypeOrmModule.forFeature([WorkingHours])],
    controllers: [WorkingHoursController],
    providers: [WorkingHoursService],
    exports: [WorkingHoursService] // Çalışma saatleri servisini dışarıya aktar
})
export class WorkingHoursModule { }