import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { createUnitSchema } from './create-unit.dto';

export const updateUnitSchema = createUnitSchema.partial();

export type UpdateUnitType = z.infer<typeof updateUnitSchema>;

export class UpdateUnitDto extends createZodDto(updateUnitSchema) {}
