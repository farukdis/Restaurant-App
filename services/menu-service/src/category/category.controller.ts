import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('menus/:menuId/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Param('menuId', ParseUUIDPipe) menuId: string, @Body() createCategoryDto: CreateCategoryDto) {
        const categoryData = {
            ...createCategoryDto,
            menu_id: menuId,
        };
        return this.categoryService.create(categoryData);
    }

    @Get()
    async findAll(@Param('menuId', ParseUUIDPipe) menuId: string) {
        return this.categoryService.findAll(menuId);
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoryService.remove(id);
    }
}