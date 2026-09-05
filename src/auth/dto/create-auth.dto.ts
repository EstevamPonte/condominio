import { z } from 'zod';

// 1. Defina o schema base (Zod)
export const createAuthSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// 2. Crie o tipo TypeScript a partir do Zod
export type CreateAuthType = z.infer<typeof createAuthSchema>;

// 3. O DTO para o NestJS mapear na assinatura do seu Controller
export class CreateAuthDto {
  email!: string;
  password!: string;
}
