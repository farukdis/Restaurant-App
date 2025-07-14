import { IsString, IsNotEmpty, IsOptional, IsUrl, IsNumber, Min } from 'class-validator';

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    logo_url?: string;

    @IsString()
    @IsOptional()
    status?: string; // 'OPEN', 'CLOSED', 'MAINTENANCE'

    @IsNumber()
    @Min(0)
    @IsOptional()
    min_order_amount?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    default_delivery_fee?: number;

    @IsString()
    @IsOptional()
    currency?: string;
}