// services/restaurant-service/src/dto/update-delivery-zone.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryZoneDto } from './create-delivery-zone.dto';

export class UpdateDeliveryZoneDto extends PartialType(CreateDeliveryZoneDto) { }