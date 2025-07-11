// services/auth-service/src/auth/dto/change-password.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty({ message: 'Mevcut parola boş bırakılamaz.' })
    @IsString({ message: 'Mevcut parola metin tipinde olmalıdır.' })
    current_password: string;

    @IsNotEmpty({ message: 'Yeni parola boş bırakılamaz.' })
    @IsString({ message: 'Yeni parola metin tipinde olmalıdır.' })
    @MinLength(6, { message: 'Yeni parola en az 6 karakter uzunluğunda olmalıdır.' }) // Güvenlik için minimum uzunluk
    new_password: string;
}