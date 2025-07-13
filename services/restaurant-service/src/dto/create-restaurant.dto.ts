// services/restaurant-service/src/dto/create-restaurant.dto.ts

import { IsString, IsPhoneNumber, IsOptional, IsUrl, IsNumber, Min, IsEmail } from 'class-validator';

export class CreateRestaurantDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsPhoneNumber('TR')
    phone_number: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    logo_url?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    min_order_amount?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    default_delivery_fee?: number;

    @IsOptional()
    @IsString()
    currency?: string;
}