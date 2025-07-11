import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty({ message: 'Adres satırı 1 boş bırakılamaz.' })
    @IsString({ message: 'Adres satırı 1 metin tipinde olmalıdır.' })
    address_line1: string;

    @IsOptional()
    @IsString({ message: 'Adres satırı 2 metin tipinde olmalıdır.' })
    address_line2?: string;

    @IsNotEmpty({ message: 'Şehir boş bırakılamaz.' })
    @IsString({ message: 'Şehir metin tipinde olmalıdır.' })
    city: string;

    @IsNotEmpty({ message: 'İlçe boş bırakılamaz.' })
    @IsString({ message: 'İlçe metin tipinde olmalıdır.' })
    district: string;

    @IsNotEmpty({ message: 'Posta kodu boş bırakılamaz.' })
    @IsString({ message: 'Posta kodu metin tipinde olmalıdır.' })
    postal_code: string;

    @IsNotEmpty({ message: 'Adres başlığı boş bırakılamaz.' })
    @IsString({ message: 'Adres başlığı metin tipinde olmalıdır.' })
    address_title: string;

    @IsOptional()
    @IsNumber({}, { message: 'Enlem sayı tipinde olmalıdır.' })
    @Min(-90, { message: 'Geçerli bir enlem değeri giriniz.' })
    @Max(90, { message: 'Geçerli bir enlem değeri giriniz.' })
    latitude?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Boylam sayı tipinde olmalıdır.' })
    @Min(-180, { message: 'Geçerli bir boylam değeri giriniz.' })
    @Max(180, { message: 'Geçerli bir boylam değeri giriniz.' })
    longitude?: number;

    @IsOptional()
    @IsBoolean({ message: 'Varsayılan adres bilgisi doğru veya yanlış olmalıdır.' })
    is_default?: boolean;
}