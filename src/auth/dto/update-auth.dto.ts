import { z } from 'zod';

// 1. Defina o schema base (Zod)
export const updateAuthSchema = z
  .object({
    userId: true,
    companyId: true,
    token: true,
  })
  .partial(); // Faz com que enviar 'userId', 'companyId' ou 'token' seja opcional no PATCH

// 2. Crie o tipo TypeScript a partir do Zod
export type UpdateAuthType = z.infer<typeof updateAuthSchema>;

// 3. O DTO para o NestJS mapear na assinatura do seu Controller
export class UpdateAuthDto {
  userId?: string;
  companyId?: string;
  token?: string;
}
