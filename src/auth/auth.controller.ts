import {
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  UsePipes,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './auth.service';
import { CreateAuthDto, createAuthSchema } from './dto/create-auth.dto';
import { ZodValidationPipe } from '@/zod';
import { UpdateAuthDto, updateAuthSchema } from './dto/update-auth.dto';
import type { Request, Response } from 'express';
import { SessionService } from '@/session/session.service';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly session: SessionService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAuthSchema))
  async create(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const login = await this.loginService.create(createAuthDto);

    this.session.setCookieSession(login.token, response);
    return login;
  }

  @Get('')
  @UseGuards(SessionAuthGuard)
  async findAll(@Req() request: Request) {
    console.log(request.cookies.session_id);
    return await this.loginService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAuthSchema))
    updateAuthDto: UpdateAuthDto,
  ) {
    return this.loginService.update(id, updateAuthDto);
  }

  @Delete()
  async remove(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const sessionId = request.cookies.session_id as string;

    if (sessionId) {
      const sessionInvalidated =
        await this.session.invalidateSession(sessionId);

      if (sessionInvalidated) {
        this.session.clearCookieSession(response);
      }
      return { message: 'Sessao deletada' };
    } else {
      return { message: 'Sessão não existe' };
    }
  }
}
