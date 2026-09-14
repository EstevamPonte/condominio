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
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard';
import type { Request } from 'express';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @UseGuards(SessionAuthGuard)
  async create(@Body() createBuildingDto: CreateBuildingDto) {
    return await this.buildingsService.create(createBuildingDto);
  }

  @Get(':propertieId')
  @UseGuards(SessionAuthGuard)
  findAll(@Param('propertieId') propertieId: string, @Req() request: Request) {
    const user = request.user;

    if (!user) return;

    return this.buildingsService.findAll(user, propertieId);
  }

  @Get(':id')
  @UseGuards(SessionAuthGuard)
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const user = request.user;

    if (!user) return;
    return await this.buildingsService.findOne(user, id);
  }

  @Patch(':id')
  @UseGuards(SessionAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
    @Req() request: Request,
  ) {
    const user = request.user;

    if (!user) return;
    return await this.buildingsService.update({ id, updateBuildingDto, user });
  }

  @Delete(':id')
  @UseGuards(SessionAuthGuard)
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(+id);
  }
}
