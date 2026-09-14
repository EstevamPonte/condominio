import { createBuildingSchema } from './create-building.dto';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateBuildingSchema = createBuildingSchema.partial();

export type updateBuildingtype = z.infer<typeof updateBuildingSchema>;

export class UpdateBuildingDto extends createZodDto(updateBuildingSchema) {}
