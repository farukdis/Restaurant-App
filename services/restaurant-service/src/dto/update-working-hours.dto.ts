// services/restaurant-service/src/dto/update-working-hours.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkingHoursDto } from './create-working-hours.dto';

export class UpdateWorkingHoursDto extends PartialType(CreateWorkingHoursDto) { }