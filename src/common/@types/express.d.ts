import { Prisma } from '@/generated/prisma/client';

declare global {
  namespace Express {
    // Nós abrimos a interface Request do Express e adicionamos nossas propriedades
    interface Request {
      cookies: Record<string, string | undefined>;
      user?: Prisma.UserGetPayload<object>;
      company?: Prisma.CompanyGetPayload<object>;
      authType?: 'user' | 'company';
    }
  }
}
