// services/auth-service/src/auth/dto/forgot-password.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
    @IsNotEmpty({ message: 'E-posta adresi boş bırakılamaz.' })
    @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz.' })
    email: string;
}