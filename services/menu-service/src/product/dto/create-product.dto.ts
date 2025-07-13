// services/menu-service/src/product/dto/create-product.dto.ts

import { IsString, IsNotEmpty, IsNumber, IsUUID, IsUrl, IsBoolean, IsInt, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsUUID()
    @IsNotEmpty()
    category_id: string;

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

    // İleride kullanılacak, şimdilik isteğe bağlı
    @IsUUID('4', { each: true })
    @IsArray()
    @IsOptional()
    allergen_ids?: string[];

    // İleride kullanılacak, şimdilik isteğe bağlı
    @IsUUID('4', { each: true })
    @IsArray()
    @IsOptional()
    modifier_ids?: string[];
}