import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1, { message: 'Nome da empresa é obrigatório' }),
  email: z.email({ message: 'Endereço de email da empresa é inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
});

export type CreateCompanyType = z.infer<typeof createCompanySchema>;

export class CreateCompanyDto {
  name!: string;
  email!: string;
  password!: string;
}
