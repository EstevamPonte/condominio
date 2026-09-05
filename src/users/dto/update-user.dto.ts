import { z } from 'zod';
import { createUserSchema } from './create-user.dto';

export const updateUserSchema = createUserSchema
  .pick({
    name: true,
    email: true,
    avatarURL: true,
    cpf: true,
    phone: true,
    status: true,
  })
  .partial();

export type UpdateUserType = z.infer<typeof updateUserSchema>;

export class UpdateUserDto {
  name?: string;
  email?: string;
  avatarURL?: string;
  cpf?: string;
  phone?: string;
  status?: string;
}
