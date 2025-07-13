import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../entities/setting.entity';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Setting)
        private settingsRepository: Repository<Setting>,
    ) { }

    async create(restaurantId: string, createSettingDto: CreateSettingDto): Promise<Setting> {
        const newSetting = this.settingsRepository.create({
            ...createSettingDto,
            restaurant_id: restaurantId,
        });
        return this.settingsRepository.save(newSetting);
    }

    async findAllByRestaurantId(restaurantId: string): Promise<Setting[]> {
        return this.settingsRepository.find({ where: { restaurant_id: restaurantId } });
    }

    async findOneByRestaurantId(restaurantId: string, keyName: string): Promise<Setting> {
        const setting = await this.settingsRepository.findOne({
            where: { restaurant_id: restaurantId, key_name: keyName },
        });
        if (!setting) {
            throw new NotFoundException(`Setting with key_name "${keyName}" for restaurant "${restaurantId}" not found.`);
        }
        return setting;
    }

    async update(restaurantId: string, keyName: string, updateSettingDto: UpdateSettingDto): Promise<Setting> {
        const setting = await this.findOneByRestaurantId(restaurantId, keyName);
        this.settingsRepository.merge(setting, updateSettingDto);
        return this.settingsRepository.save(setting);
    }

    async remove(restaurantId: string, keyName: string): Promise<void> {
        const setting = await this.findOneByRestaurantId(restaurantId, keyName);
        await this.settingsRepository.remove(setting);
    }
}