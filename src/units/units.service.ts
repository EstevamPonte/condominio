import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PrismaService } from '@/common/prisma.service';
import { Prisma } from '@/generated/prisma/client';

interface UnitsUpdateI {
  id: string;
  updateUnitDto: UpdateUnitDto;
  user: Prisma.UserGetPayload<object>;
}

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUnitDto: CreateUnitDto,
    user?: Prisma.UserGetPayload<object>,
  ) {
    const data = {
      ...createUnitDto,
      userId: createUnitDto.userId ?? user?.id,
    };

    return await this.prisma.units.create({
      data,
    });
  }

  async findAll(user: Prisma.UserGetPayload<object>, buildingId: string) {
    return await this.prisma.units.findMany({
      where: {
        buildingId,
        user,
      },
      include: {
        building: true,
      },
    });
  }

  async findOne(user: Prisma.UserGetPayload<object>, id: string) {
    return await this.prisma.units.findFirst({
      where: {
        id,
        user,
      },
      include: {
        building: true,
      },
    });
  }

  async update({ user, id, updateUnitDto }: UnitsUpdateI) {
    return await this.prisma.units.update({
      where: {
        id,
        user,
      },
      data: updateUnitDto,
    });
  }

  async remove(user: Prisma.UserGetPayload<object>, id: string) {
    return await this.prisma.units.delete({
      where: {
        id,
        user,
      },
    });
  }
}
