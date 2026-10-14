import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // Get all categories
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  // Get category by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findById(id);
  }

  // Create category
  @Post()
  async create(
    @Body()
    body: {
      category_code: string;
      category_name: string;
      users_id: string
    },
  ) {
    return this.categoryService.createCategory(
      body.category_code,
      body.category_name,
      body.users_id
    );
  }

  // Update category
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      category_code?: string;
      category_name?: string;
    },
  ) {
    return this.categoryService.updateCategory(id, body);
  }

  // Delete category
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}