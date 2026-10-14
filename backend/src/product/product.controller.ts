import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Get all products (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  // Get single product by ID (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  // Create product
  @Post()
  async create(
    @Body()
    body: {
      product_code: string;
      product_name: string;
      category_id: number;
      type_id: number;
    },
  ) {
    return this.productService.createProduct(
      body.product_code,
      body.product_name,
      body.category_id,
      body.type_id,
    );
  }

  // Update product (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      product_code?: string;
      product_name?: string;
      category_id?: number;
      type_id?: number;
    },
  ) {
    return this.productService.updateProduct(+id, body);
  }

  // Delete product (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}