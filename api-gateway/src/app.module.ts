// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './core/app.service';
import { HttpModule } from '@nestjs/axios';
import { MenuController } from './menu/menu.controller';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    RestaurantModule,
  ],
  controllers: [AppController, MenuController],
  providers: [],
})
export class AppModule { }