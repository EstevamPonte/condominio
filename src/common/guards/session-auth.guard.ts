import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Ajuste o caminho do seu Prisma
import { Request } from 'express';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 1. Pega o token direto do cookie que configuramos no login
    const token = request.cookies?.['session_id'] as string;

    if (!token) {
      throw new UnauthorizedException(
        'Sessão não encontrada. Por favor, faça login.',
      );
    }

    // 2. Busca a sessão no banco trazendo junto quem for o dono dela (User ou Company)
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: {
        user: true,
        company: true,
      },
    });

    // 3. Valida se a sessão existe e se ainda está no prazo de validade
    if (!session || session.expiresAt < new Date()) {
      // Se a sessão expirou no banco, você pode opcionalmente deletá-la aqui
      throw new UnauthorizedException('Sessão expirada ou inválida.');
    }

    // 4. Injeta os dados do dono da sessão direto no objeto request.
    // Assim, qualquer Controller protegido poderá acessar 'request.user' ou 'request.company'
    if (session.user) {
      request.user = session.user;
      request.authType = 'user';
    } else if (session.company) {
      request.company = session.company;
      request.authType = 'company';
    }

    return true; // Permite a passagem para o Controller
  }
}
