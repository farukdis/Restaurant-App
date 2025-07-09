import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator'; // IsOptional'ı import ettiğinizden emin olun

export class RegisterUserDto {
    @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz.' })
    email: string;

    @IsString({ message: 'Şifre metin formatında olmalıdır.' })
    @MinLength(8, { message: 'Şifre en az 8 karakter uzunluğunda olmalıdır.' })
    password: string;

    @IsOptional() // Bu alanın isteğe bağlı olduğunu belirtiriz
    @IsString({ message: 'Tam ad metin formatında olmalıdır.' })
    full_name?: string; // ? işareti TypeScript'te bu property'nin isteğe bağlı olduğunu belirtir

    @IsOptional() // Bu alanın isteğe bağlı olduğunu belirtiriz
    @IsString({ message: 'Telefon numarası metin formatında olmalıdır.' })
    phone_number?: string;

    @IsOptional() // Bu alanın isteğe bağlı olduğunu belirtiriz
    @IsString({ message: 'Rol ID metin formatında olmalıdır.' })
    role_id?: string;
}