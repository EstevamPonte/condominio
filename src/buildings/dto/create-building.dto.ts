import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createBuildingSchema = z.object({
  propertyId: z.uuid(),
  userId: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Campo obrigatório' })
    .meta({ description: 'Nome do bloco/torre/predio', example: 'Bloco A' }),
  description: z
    .string()
    .meta({ description: 'Alguma descriçao', example: 'Ao lado do bloco B' }),
});

export type CreateBuildingType = z.infer<typeof createBuildingSchema>;

export class CreateBuildingDto extends createZodDto(createBuildingSchema) {}
