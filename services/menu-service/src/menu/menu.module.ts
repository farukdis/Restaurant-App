import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from '../entities/menu.entity'; // Sadece Menu entity'sini import edin

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Menu, // Sadece Menu entity'si kaldı
        ]),
    ],
    controllers: [MenuController],
    providers: [MenuService],
    exports: [MenuService],
})
export class MenuModule { }