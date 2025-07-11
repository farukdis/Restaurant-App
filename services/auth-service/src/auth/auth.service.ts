// services/auth-service/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisteredUserDto } from './dto/registered-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto'; // <-- YENİ EKLENDİ

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(
        email: string,
        password: string,
        full_name?: string,
        phone_number?: string,
    ): Promise<{ user: RegisteredUserDto; token: string }> {
        console.log('Register method called for customer:', email);
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Bu e-posta adresi zaten kullanılıyor.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.usersRepository.create({
            email,
            password: hashedPassword,
            full_name,
            phone_number,
            is_active: true,
        });
        await this.usersRepository.save(newUser);

        const payload = { email: newUser.email, sub: newUser.id };
        const accessToken = await this.jwtService.sign(payload);

        const registeredUserDto = new RegisteredUserDto(newUser);

        return { user: registeredUserDto, token: accessToken };
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        console.log('Login method called for customer:', email);
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'full_name', 'is_active', 'last_login_at'],
        });

        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı veya e-posta/şifre hatalı.');
        }

        if (!user.is_active) {
            throw new UnauthorizedException('Hesabınız aktif değil. Lütfen yöneticinizle iletişime geçin.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
        }

        user.last_login_at = new Date();
        await this.usersRepository.save(user);

        const payload = { email: user.email, sub: user.id };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    async getProfile(userId: string): Promise<UserProfileDto> {
        console.log('Fetching profile for userId:', userId);
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            select: ['id', 'email', 'full_name', 'phone_number', 'profile_picture_url', 'is_active'],
        });

        if (!user) {
            throw new NotFoundException('Kullanıcı profili bulunamadı.');
        }

        return new UserProfileDto(user);
    }

    async updateProfile(userId: string, updateData: UpdateUserProfileDto): Promise<UserProfileDto> {
        console.log('Updating profile for userId:', userId, 'with data:', updateData);

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('Kullanıcı profili bulunamadı.');
        }

        if (updateData.full_name !== undefined) {
            user.full_name = updateData.full_name;
        }
        if (updateData.phone_number !== undefined) {
            user.phone_number = updateData.phone_number;
        }
        if (updateData.profile_picture_url !== undefined) {
            user.profile_picture_url = updateData.profile_picture_url;
        }

        await this.usersRepository.save(user);

        return new UserProfileDto(user);
    }

    // YENİ METOT: Kullanıcının parolasını değiştirir
    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
        console.log('Changing password for userId:', userId);

        const user = await this.usersRepository.findOne({
            where: { id: userId },
            select: ['id', 'password'], // Parola doğrulaması için password'ü seçiyoruz
        });

        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı.');
        }

        // Mevcut parolayı doğrula
        const isCurrentPasswordValid = await bcrypt.compare(changePasswordDto.current_password, user.password);
        if (!isCurrentPasswordValid) {
            throw new UnauthorizedException('Mevcut parola hatalı.');
        }

        // Yeni parolayı hashle ve kaydet
        const hashedNewPassword = await bcrypt.hash(changePasswordDto.new_password, 10);
        user.password = hashedNewPassword;
        await this.usersRepository.save(user);

        return { message: 'Parola başarıyla değiştirildi.' };
    }

    async validateUserById(userId: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id: userId } });
    }
}