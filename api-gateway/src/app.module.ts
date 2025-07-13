// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; // AppService'i buradan kaldıracağız
import { HttpModule } from '@nestjs/axios'; // HttpModule'ü buradan kaldıracağız
import { MenuController } from './menu/menu.controller';
import { RestaurantModule } from './restaurant/restaurant.module'; // RestaurantModule'ü import et
import { CoreModule } from './core/core.module'; // CoreModule'ü import et

@Module({
  imports: [
    CoreModule, // CoreModule'ü buraya ekle
    RestaurantModule, // RestaurantModule'ü buraya ekle
  ],
  controllers: [AppController, MenuController],
  providers: [], // AppService artık CoreModule'den geliyor, buradan kaldır
})
export class AppModule { }