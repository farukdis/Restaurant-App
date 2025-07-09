import { Module } from '@nestjs/common'; // **DEĞİŞTİ: OnModuleInit kaldırıldı**
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AdminUser } from './entities/admin-user.entity';
import { Role } from './entities/role.entity';
import { PasswordResetToken } from './entities/password-reset-token.entity'; // <-- Bu satırı ekleyin!
// import { DataSource } from 'typeorm'; // **DEĞİŞTİ: DataSource artık gerekli değil, kaldırıldı**

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, AdminUser, Role, PasswordResetToken],
        synchronize: true,
        logging: ['query', 'error'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }