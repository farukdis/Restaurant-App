import { Controller, Post, Get, Put, Delete, Body, Param, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AddressService } from './address.service';
import { CreateAddressDto } from '../auth/dto/create-address.dto';
import { UpdateAddressDto } from '../auth/dto/update-address.dto';
import { User as UserEntity } from '../entities/user.entity';
import { Address } from '../entities/address.entity';

@Controller('users/me/addresses') // Base URL: /api/auth/users/me/addresses
@UseGuards(AuthGuard('jwt')) // Tüm endpoint'ler için JWT koruması
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post() // POST /api/auth/users/me/addresses
    @HttpCode(HttpStatus.CREATED)
    async createAddress(@Req() req: Request, @Body() createAddressDto: CreateAddressDto): Promise<Address> {
        const user = req.user as UserEntity;
        return this.addressService.create(user.id, createAddressDto);
    }

    @Get() // GET /api/auth/users/me/addresses
    async findAllAddresses(@Req() req: Request): Promise<Address[]> {
        const user = req.user as UserEntity;
        return this.addressService.findAll(user.id);
    }

    @Put(':addressId') // PUT /api/auth/users/me/addresses/{addressId}
    async updateAddress(
        @Req() req: Request,
        @Param('addressId') addressId: string,
        @Body() updateAddressDto: UpdateAddressDto,
    ): Promise<Address> {
        const user = req.user as UserEntity;
        return this.addressService.update(user.id, addressId, updateAddressDto);
    }

    @Delete(':addressId') // DELETE /api/auth/users/me/addresses/{addressId}
    @HttpCode(HttpStatus.OK)
    async removeAddress(
        @Req() req: Request,
        @Param('addressId') addressId: string,
    ): Promise<{ message: string }> {
        const user = req.user as UserEntity;
        return this.addressService.remove(user.id, addressId);
    }
}