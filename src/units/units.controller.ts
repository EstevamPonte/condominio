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
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard';
import type { Request } from 'express';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @UseGuards(SessionAuthGuard)
  async create(@Body() createUnitDto: CreateUnitDto, @Req() request: Request) {
    const user = request.user;
    return await this.unitsService.create(createUnitDto, user);
  }

  @Get('building/:buildingId')
  @UseGuards(SessionAuthGuard)
  async findAll(
    @Param('buildingId') buildingId: string,
    @Req() request: Request,
  ) {
    const user = request.user;
    if (!user) return;
    return await this.unitsService.findAll(user, buildingId);
  }

  @Get(':id')
  @UseGuards(SessionAuthGuard)
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const user = request.user;
    if (!user) return;
    return await this.unitsService.findOne(user, id);
  }

  @Patch(':id')
  @UseGuards(SessionAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
    @Req() request: Request,
  ) {
    const user = request.user;
    if (!user) return;
    return await this.unitsService.update({ id, updateUnitDto, user });
  }

  @Delete(':id')
  @UseGuards(SessionAuthGuard)
  async remove(@Param('id') id: string, @Req() request: Request) {
    const user = request.user;
    if (!user) return;
    return await this.unitsService.remove(user, id);
  }
}
