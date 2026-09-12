import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).meta({
    description: 'Nome do usuário',
    example: 'Estevam',
  }),
  email: z.email({ message: 'Invalid email address' }).meta({
    description: 'Email do usuário',
    example: 'test@gmail.com',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .meta({
      description: 'Senha',
      example: '12345678',
    }),
  companyId: z.uuid('Company ID is required').meta({
    description: 'Id da empresa',
    example: 'b894ae24-93e7-49ca-ac2b-cfe0b3470008',
  }),
  phone: z.string().min(11, { message: 'Informe o numero de celular' }).meta({
    description: 'Numero do usuário',
    example: '85986342669',
  }),
  cpf: z.string().min(11, { message: 'Informe o CPF' }).meta({
    description: 'CPF do usuário',
    example: '04006679327',
  }),
  avatarURL: z.string().optional().meta({
    description: 'Foto do usuário',
    example: 'https://avatars.githubusercontent.com/u/46602186?v=4&size=200',
  }),
  status: z.string().meta({
    description: 'Status atual do usuário',
    example: 'active',
  }),
  role: z.string().meta({
    description: 'Papel do usuário no sistema',
    example: 'admin',
  }),
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export class CreateUserDto extends createZodDto(createUserSchema) {}
