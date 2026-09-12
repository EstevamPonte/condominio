import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createCompanySchema = z.object({
  name: z.string().min(1, { message: 'Nome da empresa é obrigatório' }).meta({
    description: 'Nome da empresa',
    example: 'Condominio do zemanel',
  }),
  email: z.email({ message: 'Endereço de email da empresa é inválido' }).meta({
    description: 'Email da empresa',
    example: 'test@gmail.com',
  }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .meta({
      description: 'Senha da empresa',
      example: '12345678',
    }),
});

export type CreateCompanyType = z.infer<typeof createCompanySchema>;

export class CreateCompanyDto extends createZodDto(createCompanySchema) {}
