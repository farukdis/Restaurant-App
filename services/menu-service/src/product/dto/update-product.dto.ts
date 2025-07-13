// services/menu-service/src/product/dto/update-product.dto.ts

import { IsString, IsNumber, IsUUID, IsUrl, IsBoolean, IsInt, IsArray, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsUUID()
    @IsOptional()
    category_id?: string;

    @IsUrl()
    @IsOptional()
    image_url?: string;

    @IsBoolean()
    @IsOptional()
    is_available?: boolean;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @IsInt()
    @IsOptional()
    order_index?: number;

    @IsUUID('4', { each: true })
    @IsArray()
    @IsOptional()
    allergen_ids?: string[];

    @IsUUID('4', { each: true })
    @IsArray()
    @IsOptional()
    modifier_ids?: string[];
}