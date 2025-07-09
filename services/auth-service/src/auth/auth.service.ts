import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'; // User entity'sini kullanıyoruz
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisteredUserDto } from './dto/registered-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) // Sadece User Repository'sini enjekte ediyoruz
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    // Bu register metodu artık sadece MÜŞTERİ kullanıcılarını kaydeder.
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
            is_active: true, // Varsayılan olarak aktif
            // last_login_at alanı burada belirtilmiyor, entity'de nullable olduğu için TypeORM otomatik olarak NULL bırakacak
        });
        await this.usersRepository.save(newUser);

        // JWT payload'ına rol bilgisi eklemeyeceğiz, çünkü bu müşteri kullanıcısı
        const payload = { email: newUser.email, sub: newUser.id };
        const accessToken = await this.jwtService.sign(payload);

        const registeredUserDto = new RegisteredUserDto(newUser);

        return { user: registeredUserDto, token: accessToken };
    }

    // Bu login metodu sadece MÜŞTERİ kullanıcılarını doğrular.
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

    // Kullanıcı profili bilgilerini getiren metot (GET /users/me için)
    async getProfile(userId: string): Promise<UserProfileDto> {
        console.log('Fetching profile for userId:', userId);
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            // Sadece UserProfileDto'da olan alanları seçiyoruz (password'ü seçmiyoruz!)
            select: ['id', 'email', 'full_name', 'phone_number', 'profile_picture_url', 'is_active'],
        });

        if (!user) {
            throw new NotFoundException('Kullanıcı profili bulunamadı.');
        }

        // Bulunan kullanıcı varlığını UserProfileDto'ya dönüştür ve döndür
        return new UserProfileDto(user);
    }

    // Bu metot, JWT stratejisi tarafından kullanıcının varlığını doğrulamak için kullanılır
    async validateUserById(userId: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id: userId } });
    }
}