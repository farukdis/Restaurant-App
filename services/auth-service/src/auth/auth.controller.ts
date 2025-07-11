// services/auth-service/src/auth/auth.controller.ts
import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req, UseGuards, Put, Patch } from '@nestjs/common'; // **DEĞİŞTİ: Patch eklendi**
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserProfileDto } from './dto/user-profile.dto';
import { User as UserEntity } from '../entities/user.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto'; // **YENİ: ChangePasswordDto import edildi**

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

    @Get('users/me') // GET /api/auth/users/me
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    async getMyProfile(@Req() req: Request): Promise<UserProfileDto> {
        const user = req.user as UserEntity;
        console.log('GET /users/me called for user ID:', user.id);
        return this.authService.getProfile(user.id);
    }

    @Put('users/me') // PUT /api/auth/users/me
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    async updateMyProfile(@Req() req: Request, @Body() updateData: UpdateUserProfileDto): Promise<UserProfileDto> {
        const user = req.user as UserEntity;
        console.log('PUT /users/me called for user ID:', user.id, 'with data:', updateData);
        return this.authService.updateProfile(user.id, updateData);
    }


    @Patch('users/me/password') // **YENİ: PATCH /api/auth/users/me/password endpoint'i**
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    async changeMyPassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
        const user = req.user as UserEntity;
        console.log('PATCH /users/me/password called for user ID:', user.id);
        // AuthService'in changePassword metodunu çağırarak parolayı değiştir
        return this.authService.changePassword(user.id, changePasswordDto);
    }
}