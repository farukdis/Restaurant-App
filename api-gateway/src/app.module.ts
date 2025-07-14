// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './core/app.service'; // Bu satır artık doğrudan kullanılmasa da, CoreModule'den geldiği için kalabilir.
import { HttpModule } from '@nestjs/axios'; // Bu satır artık doğrudan kullanılmasa da, CoreModule'den geldiği için kalabilir.
import { RestaurantModule } from './restaurant/restaurant.module';
import { CoreModule } from './core/core.module';
import { MenuModule } from './menu/menu.module'; // Yeni eklendi

@Module({
  imports: [
    CoreModule,
    RestaurantModule,
    MenuModule, // Yeni eklendi
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }