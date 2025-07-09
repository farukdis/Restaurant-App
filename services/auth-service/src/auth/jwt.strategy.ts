// services/auth-service/src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        // JWT_SECRET'ın tanımlı olduğundan emin olmak için kontrol ekledik
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            // Eğer JWT_SECRET tanımlı değilse, uygulamanın başlamasına izin verme
            // Geliştirme ortamında bu bir hata veya eksik yapılandırma demektir.
            throw new Error('JWT_SECRET ortam değişkeni tanımlanmamış. Lütfen .env dosyanızı kontrol edin.');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret, // **DEĞİŞTİ: Artık undefined olamaz**
        });
    }

    async validate(payload: { sub: string; email: string }): Promise<User> {
        const user = await this.authService.validateUserById(payload.sub);

        if (!user) {
            throw new UnauthorizedException('Geçersiz token veya kullanıcı bulunamadı.');
        }
        return user;
    }
}