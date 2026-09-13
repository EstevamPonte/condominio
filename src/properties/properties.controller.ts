import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard';
import type { Request } from 'express';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(SessionAuthGuard)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  async findAll(@Req() request: Request) {
    const user = request.user;

    if (!user) return;

    return await this.propertiesService.findAll(user);
  }

  @Get(':id')
  @UseGuards(SessionAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.propertiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(SessionAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Req() request: Request,
  ) {
    const user = request.user;

    if (!user) return;
    return this.propertiesService.update({
      id,
      updatePropertyDto,
      user,
    });
  }

  @Delete(':id')
  @UseGuards(SessionAuthGuard)
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
