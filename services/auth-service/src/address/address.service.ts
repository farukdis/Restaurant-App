import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';
import { CreateAddressDto } from '../auth/dto/create-address.dto';
import { UpdateAddressDto } from '../auth/dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,
    ) { }

    async create(userId: string, createAddressDto: CreateAddressDto): Promise<Address> {
        const newAddress = this.addressRepository.create({
            ...createAddressDto,
            user: { id: userId } as User,
        });

        // Eğer yeni adres varsayılan olarak işaretlendiyse, diğerlerini false yap
        if (createAddressDto.is_default) {
            await this.addressRepository.update(
                { user: { id: userId }, is_default: true },
                { is_default: false },
            );
        }

        return this.addressRepository.save(newAddress);
    }

    async findAll(userId: string): Promise<Address[]> {
        return this.addressRepository.find({
            where: { user: { id: userId } },
        });
    }

    async update(userId: string, addressId: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
        const address = await this.addressRepository.findOne({
            where: { id: addressId, user: { id: userId } },
        });

        if (!address) {
            throw new NotFoundException('Adres bulunamadı.');
        }

        // Eğer güncellenen adres varsayılan olarak işaretleniyorsa, diğerlerini false yap
        if (updateAddressDto.is_default) {
            await this.addressRepository.update(
                { user: { id: userId }, is_default: true },
                { is_default: false },
            );
        }

        const updatedAddress = Object.assign(address, updateAddressDto);
        return this.addressRepository.save(updatedAddress);
    }

    async remove(userId: string, addressId: string): Promise<{ message: string }> {
        const result = await this.addressRepository.delete({ id: addressId, user: { id: userId } });

        if (result.affected === 0) {
            throw new NotFoundException('Adres bulunamadı veya silinemedi.');
        }

        return { message: 'Adres başarıyla silindi.' };
    }
}