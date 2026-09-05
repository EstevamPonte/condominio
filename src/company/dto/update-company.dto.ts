import { z } from 'zod';
import { createCompanySchema } from './create-company.dto';

export const updateCompanySchema = createCompanySchema
  .pick({
    name: true,
    email: true,
  })
  .partial();

export type UpdateCompanyType = z.infer<typeof updateCompanySchema>;

export class UpdateCompanyDto {
  name?: string;
  email?: string;
}
