import { PrismaService } from '@/common/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PasswordService } from '@/common/password.service';
import {
  NotFoundException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { SessionService } from '@/session/session.service';
import { Response } from 'express';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly usersServices: UsersService,
    private readonly session: SessionService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const user = await this.usersServices.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const passwordMatch = await this.passwordService.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Senha ou email incorretos');
    }

    const session = await this.session.createSession(user.id);
    return session;
  }

  async findAll() {
    return await this.prisma.session.findMany();
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return {
      id,
      updateAuthDto,
    };
  }
}
