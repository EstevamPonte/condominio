import { createPropertySchema } from './create-property.dto';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updatePropertySchema = createPropertySchema.partial();

export type UpdatePropertieType = z.infer<typeof updatePropertySchema>;

export class UpdatePropertyDto extends createZodDto(updatePropertySchema) {}
