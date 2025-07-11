import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Address]), // Address entity'sini bu modülde kullanılabilir hale getir
    ],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService], // AddressService'i dışa aktar, başka modüller kullanabilirse
})
export class AddressModule { }