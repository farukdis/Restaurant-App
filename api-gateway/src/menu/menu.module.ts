import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { CoreModule } from '../core/core.module'; // CoreModule'ü import et

@Module({
    imports: [CoreModule], // CoreModule'ü buraya ekle
    controllers: [MenuController],
})
export class MenuModule { }