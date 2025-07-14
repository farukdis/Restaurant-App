import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('admin/restaurants/:restaurantId/menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Param('restaurantId', ParseUUIDPipe) restaurantId: string, @Body() createMenuDto: CreateMenuDto) {
        const menuData = {
            ...createMenuDto,
            restaurant_id: restaurantId,
        };
        return this.menuService.create(menuData);
    }

    @Get()
    async findAll() {
        return this.menuService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.menuService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.update(id, updateMenuDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.menuService.remove(id);
    }
}