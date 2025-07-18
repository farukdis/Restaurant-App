// services/restaurant-service/src/dto/create-delivery-zone.dto.ts

import { IsString, IsNumber, Min, IsObject, IsBoolean, IsOptional } from 'class-validator';

export class CreateDeliveryZoneDto {
    @IsString()
    zone_name: string;

    @IsNumber()
    @Min(0)
    min_order_amount: number;

    @IsNumber()
    @Min(0)
    delivery_fee: number;

    @IsObject()
    @IsOptional()
    polygon_coordinates?: object;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}