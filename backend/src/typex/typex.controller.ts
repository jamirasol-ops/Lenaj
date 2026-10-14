import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TypexService } from './typex.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('typex')
export class TypexController {
  constructor(private typexService: TypexService) {}

  // Get all users (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.typexService.getAll();
  }

  // Get single user by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.typexService.findById(+id);
  }

  // Create user (open - for demo)
  @Post()
  async create(@Body() body: { type_code: string; type_name: string }) {
    return this.typexService.createTypex(body.type_code, body.type_name);
  }

  // Update user (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.typexService.updateTypex(+id, body);
  }

  // Delete user (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.typexService.deleteTypex(+id);
  }
}