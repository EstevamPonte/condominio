import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from './auth.service';
import { PrismaService } from '@/common/prisma.service';
import { PasswordService } from '@/common/password.service';
import { UsersService } from '@/users/users.service';
import { SessionService } from '@/session/session.service';

@Module({
  controllers: [AuthController],
  providers: [
    LoginService,
    PrismaService,
    PasswordService,
    UsersService,
    SessionService,
  ],
})
export class AuthModule {}
