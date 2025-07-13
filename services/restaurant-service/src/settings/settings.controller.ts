import { Controller, Get, Post, Put, Body, Param, ParseUUIDPipe, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';

@Controller('admin/restaurants/:restaurantId/settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Body() createSettingDto: CreateSettingDto,
    ) {
        return this.settingsService.create(restaurantId, createSettingDto);
    }

    @Get()
    async findAll(@Param('restaurantId', ParseUUIDPipe) restaurantId: string) {
        return this.settingsService.findAllByRestaurantId(restaurantId);
    }

    @Get(':keyName')
    async findOne(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('keyName') keyName: string,
    ) {
        return this.settingsService.findOneByRestaurantId(restaurantId, keyName);
    }

    @Put(':keyName')
    async update(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('keyName') keyName: string,
        @Body() updateSettingDto: UpdateSettingDto,
    ) {
        return this.settingsService.update(restaurantId, keyName, updateSettingDto);
    }

    @Delete(':keyName')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('keyName') keyName: string,
    ) {
        await this.settingsService.remove(restaurantId, keyName);
        return;
    }
}