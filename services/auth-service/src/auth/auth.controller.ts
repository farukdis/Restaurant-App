// services/auth-service/src/auth/auth.controller.ts
import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req, UseGuards } from '@nestjs/common'; // **DEĞİŞTİ: Get, Req, UseGuards eklendi**
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport'; // **YENİ: AuthGuard import edildi**
import { Request } from 'express'; // **YENİ: Express'ten Request tipi import edildi**
import { UserProfileDto } from './dto/user-profile.dto'; // **YENİ: UserProfileDto import edildi**
import { User as UserEntity } from '../entities/user.entity'; // User entity'sini import ediyoruz (çakışmaması için takma ad verdik)

@Controller('') // Global prefix '/api/auth' olduğu için burası boş kalabilir
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register') // POST /api/auth/register
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerUserDto: RegisterUserDto) {
        const { email, password, full_name, phone_number } = registerUserDto;
        return this.authService.register(email, password, full_name, phone_number);
    }

    @Post('login') // POST /api/auth/login
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        return this.authService.login(email, password);
    }

    @Get('users/me') // **YENİ: GET /api/auth/users/me endpoint'i**
    @UseGuards(AuthGuard('jwt')) // Bu endpoint'i JWT stratejisi ile koru
    @HttpCode(HttpStatus.OK)
    async getMyProfile(@Req() req: Request): Promise<UserProfileDto> {
        // req.user, JwtStrategy'den dönen User objesini içerir (Passport'un eklediği)
        const user = req.user as UserEntity; // Tipi belirginleştiriyoruz
        console.log('GET /users/me called for user ID:', user.id);
        // AuthService'in getProfile metodunu çağırarak kullanıcı profili al
        return this.authService.getProfile(user.id);
    }
}