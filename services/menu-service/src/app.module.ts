// services/menu-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Yeni oluşturduğumuz entity'leri import ediyoruz
import { Menu } from './entities/menu.entity'; // Yeni eklendi
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Allergen } from './entities/allergen.entity';
import { ProductAllergen } from './entities/product-allergen.entity';
import { Modifier } from './entities/modifier.entity';
import { ModifierOption } from './entities/modifier-option.entity';
import { ProductModifier } from './entities/product-modifier.entity';

import { MenuModule } from './menu/menu.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module'; // Yeni eklendi

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Bu satır, servis kendi .env dosyasını okuyacak
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
        entities: [Menu, Category, Product, Allergen, ProductAllergen, Modifier, ModifierOption, ProductModifier], // Menu entity'si eklendi
        synchronize: true,
        // logging: true, // Opsiyonel: SQL sorgularını görmek için açabilirsiniz
      }),
      inject: [ConfigService],
    }),
    MenuModule,
    ProductModule,
    CategoryModule, // CategoryModule'ü buraya ekleyin
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }