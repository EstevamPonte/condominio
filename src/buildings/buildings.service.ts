import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PrismaService } from '@/common/prisma.service';
import { Prisma } from '@/generated/prisma/client';

interface BuildingsUpdateI {
  id: string;
  updateBuildingDto: UpdateBuildingDto;
  user: Prisma.UserGetPayload<object>;
}

@Injectable()
export class BuildingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBuildingDto: CreateBuildingDto) {
    const createBuilding = await this.prisma.buildings.create({
      data: createBuildingDto,
    });
    return createBuilding;
  }

  async findAll(user: Prisma.UserGetPayload<object>, propertieId: string) {
    return await this.prisma.buildings.findMany({
      where: {
        properties: {
          id: propertieId,
        },
        user: user,
      },
      include: {
        user: true,
      },
    });
  }

  async findOne(user: Prisma.UserGetPayload<object>, id: string) {
    const building = await this.prisma.buildings.findUnique({
      where: {
        id: id,
        user: user,
      },
    });
    return building;
  }

  async update({ user, id, updateBuildingDto }: BuildingsUpdateI) {
    const updatedBuilding = await this.prisma.buildings.update({
      where: {
        user,
        id,
      },
      data: {
        ...updateBuildingDto,
      },
    });
    return updatedBuilding;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
