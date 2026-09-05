import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/common/prisma.service';
import { PasswordService } from '@/common/password.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Hash the password before creating the user

    const hashedPassword = await this.passwordService.hash(
      createUserDto.password,
    );

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email: email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { message: `Usuário removido com sucesso.` };
  }
}
