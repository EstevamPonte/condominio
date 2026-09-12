import { z } from 'zod';
import { createCompanySchema } from './create-company.dto';
import { createZodDto } from 'nestjs-zod';

export const updateCompanySchema = createCompanySchema
  .pick({
    name: true,
    email: true,
  })
  .partial();

export type UpdateCompanyType = z.infer<typeof updateCompanySchema>;

export class UpdateCompanyDto extends createZodDto(updateCompanySchema) {}
