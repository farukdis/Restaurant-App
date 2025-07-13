// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MenuController } from './menu/menu.controller'; // Yeni kontrolcüyü import edin

@Module({
  imports: [HttpModule],
  controllers: [AppController, MenuController], // MenuController'ı ekleyin
  providers: [AppService],
})
export class AppModule { }