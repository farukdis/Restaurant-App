// services/auth-service/src/auth/dto/login-user.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz.' })
    email: string;

    @IsString({ message: 'Şifre metin formatında olmalıdır.' })
    password: string;
}