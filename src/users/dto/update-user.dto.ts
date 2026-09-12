import { z } from 'zod';
import { createUserSchema } from './create-user.dto';
import { createZodDto } from 'nestjs-zod';

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

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
