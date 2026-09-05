import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '@/common/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.prisma.company.create({ data: createCompanyDto });
    return company;
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
    return company;
  }

  remove(id: string) {
    const company = this.prisma.company.delete({ where: { id } });
    return company;
  }
}
