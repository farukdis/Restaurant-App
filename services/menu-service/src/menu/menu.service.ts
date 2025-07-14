import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menusRepository: Repository<Menu>,
    ) { }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        const newMenu = this.menusRepository.create(createMenuDto);
        return this.menusRepository.save(newMenu);
    }

    async findAll(): Promise<Menu[]> {
        return this.menusRepository.find();
    }

    async findOne(id: string): Promise<Menu> {
        const menu = await this.menusRepository.findOne({ where: { id } });
        if (!menu) {
            throw new NotFoundException(`Menu with ID "${id}" not found.`);
        }
        return menu;
    }

    async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        const menu = await this.findOne(id);
        this.menusRepository.merge(menu, updateMenuDto);
        return this.menusRepository.save(menu);
    }

    async remove(id: string): Promise<void> {
        const menu = await this.findOne(id);
        await this.menusRepository.remove(menu);
    }
}