// services/restaurant-service/src/dto/create-working-hours.dto.ts

import { IsInt, IsString, IsBoolean, IsOptional, Min, Max, Matches } from 'class-validator';

export class CreateWorkingHoursDto {
    @IsInt()
    @Min(0)
    @Max(6)
    day_of_week: number; // 0 (Pazar) - 6 (Cumartesi)

    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
        message: 'open_time formatı "HH:MM:SS" olmalıdır.'
    })
    open_time: string;

    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
        message: 'close_time formatı "HH:MM:SS" olmalıdır.'
    })
    close_time: string;

    @IsBoolean()
    @IsOptional()
    is_closed?: boolean;
}