// services/auth-service/src/auth/dto/reset-password.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty({ message: 'Token boş bırakılamaz.' })
    @IsString({ message: 'Token metin tipinde olmalıdır.' })
    token: string;

    @IsNotEmpty({ message: 'Yeni parola boş bırakılamaz.' })
    @IsString({ message: 'Yeni parola metin tipinde olmalıdır.' })
    @MinLength(6, { message: 'Yeni parola en az 6 karakter uzunluğunda olmalıdır.' })
    new_password: string;
}