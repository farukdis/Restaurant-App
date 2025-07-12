import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MenuController } from './menu/menu.controller';


@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    AppController,
    MenuController,
  ],
  providers: [AppService],
})
export class AppModule { }