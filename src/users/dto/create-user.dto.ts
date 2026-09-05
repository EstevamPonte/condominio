import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  companyId: z.uuid('Company ID is required'),
  phone: z.string().min(11, { message: 'Informe o numero de celular' }),
  cpf: z.string().min(11, { message: 'Informe o CPF' }),
  avatarURL: z.string(),
  status: z.string(),
  role: z.string(),
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  companyId!: string;
  phone!: string;
  cpf!: string;
  avatarURL?: string;
  status!: string;
  role!: string;
}
