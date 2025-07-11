// services/auth-service/src/auth/dto/update-user-profile.dto.ts
import { IsOptional, IsString, IsUrl, IsPhoneNumber } from 'class-validator';

export class UpdateUserProfileDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone_number?: string;

    @IsOptional()
    @IsUrl()
    profile_picture_url?: string;
}