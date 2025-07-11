import { IsOptional, IsString, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class UpdateAddressDto {
    @IsOptional()
    @IsString({ message: 'Adres satırı 1 metin tipinde olmalıdır.' })
    address_line1?: string;

    @IsOptional()
    @IsString({ message: 'Adres satırı 2 metin tipinde olmalıdır.' })
    address_line2?: string;

    @IsOptional()
    @IsString({ message: 'Şehir metin tipinde olmalıdır.' })
    city?: string;

    @IsOptional()
    @IsString({ message: 'İlçe metin tipinde olmalıdır.' })
    district?: string;

    @IsOptional()
    @IsString({ message: 'Posta kodu metin tipinde olmalıdır.' })
    postal_code?: string;

    @IsOptional()
    @IsString({ message: 'Adres başlığı metin tipinde olmalıdır.' })
    address_title?: string;

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