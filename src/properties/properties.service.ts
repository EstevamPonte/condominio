import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from '@/common/prisma.service';
import { Prisma } from '@/generated/prisma/client';

interface PropertiesUpdateI {
  id: string;
  updatePropertyDto: UpdatePropertyDto;
  user: Prisma.UserGetPayload<object>;
}

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const propertie = await this.prisma.properties.create({
      data: createPropertyDto,
    });

    return propertie;
  }

  async findAll(user: Prisma.UserGetPayload<object>) {
    const properties = await this.prisma.properties.findMany({
      where: { user: user },
    });
    return properties;
  }

  async findOne(id: string) {
    return await this.prisma.properties.findUnique({
      where: {
        id,
      },
    });
  }

  async update({ id, updatePropertyDto, user }: PropertiesUpdateI) {
    const updatedPropertie = await this.prisma.properties.update({
      where: {
        id: id,
        user: user,
      },
      data: {
        ...updatePropertyDto,
      },
    });
    return updatedPropertie;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
