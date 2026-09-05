import { PrismaService } from '@/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import crypto from 'node:crypto';

@Injectable()
export class SessionService {
  EXPIRATIONS_IN_MILLISECONDS: number;

  constructor(private readonly prisma: PrismaService) {
    this.EXPIRATIONS_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000; // 30 Days
  }

  async checkExistingSession(id: string) {
    return await this.prisma.session.findFirst({
      where: {
        OR: [{ userId: id }, { companyId: id }],
      },
    });
  }

  async createSession(id: string) {
    const token = crypto.randomBytes(48).toString('hex');
    const expiresAt = new Date(Date.now() + this.EXPIRATIONS_IN_MILLISECONDS);
    const session = await this.checkExistingSession(id);

    if (session) {
      return await this.updateSession(session.id);
    }

    const newSession = await this.prisma.session.create({
      data: { token, expiresAt, userId: id },
    });

    return newSession;
  }

  async updateSession(sessionId: string) {
    return await this.prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: new Date(Date.now() + this.EXPIRATIONS_IN_MILLISECONDS),
      },
    });
  }

  async invalidateSession(sessionId: string) {
    // 1. Busca a sessão atual para descobrir o expires_at original
    const session = await this.prisma.session.findUnique({
      where: { token: sessionId },
    });

    if (!session) return false;

    // 2. Subtrai 1 ano da data usando o JavaScript
    const newExpiration = new Date(session.createdAt);
    newExpiration.setFullYear(newExpiration.getFullYear() - 1);

    // 3. Salva a nova data no banco
    await this.prisma.session.update({
      where: { token: sessionId },
      data: {
        expiresAt: newExpiration,
        updatedAt: new Date(),
      },
    });

    return true;
  }

  async deleteSession(token: string) {
    const session = this.prisma.session.delete({ where: { token } });

    return session;
  }

  setCookieSession(sessionToken: string, response: Response) {
    response.cookie('session_id', sessionToken, {
      path: '/',
      maxAge: this.EXPIRATIONS_IN_MILLISECONDS / 1000,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  clearCookieSession(response: Response) {
    response.cookie('session_id', 'invalid', {
      path: '/',
      maxAge: -1,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });
  }
}
