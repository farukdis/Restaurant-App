import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}