import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateAuthSchema = z
  .object({
    userId: z.uuid(),
    companyId: z.uuid(),
    token: z.string(),
  })
  .partial();

export type UpdateAuthType = z.infer<typeof updateAuthSchema>;

export class UpdateAuthDto extends createZodDto(updateAuthSchema) {}
