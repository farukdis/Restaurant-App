// services/restaurant-service/src/dto/create-setting.dto.ts

import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingDto {
    @IsString()
    @IsNotEmpty()
    key_name: string;

    @IsString()
    @IsNotEmpty()
    key_value: string;

    @IsBoolean()
    is_sensitive: boolean;
}