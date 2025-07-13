// api-gateway/src/core/core.module.ts

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [AppService],
    exports: [AppService, HttpModule],
})
export class CoreModule { }