import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createPropertySchema = z.object({
  userId: z.uuid().meta({
    description: 'User uuid',
    example: '34470e9b-c64d-4ab2-8279-c330598b0e6b',
  }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }).meta({
    description: 'Nome da Propriedade',
    example: 'Edificil Siena',
  }),
  description: z.string().meta({
    description: 'Alguma descriçao',
    example: 'Sem desçriçao',
  }),
  street: z.string().min(1, { error: 'Rua é obrigatório' }).meta({
    description: 'Nome da Rua',
    example: 'Rua Joao Regino',
  }),
  complement: z.string().meta({
    description: 'Alguma descriçao',
    example: 'Ao lado do super mercado cometa',
  }),
  neighborhood: z.string().min(1, { error: 'Bairro obrigatório' }).meta({
    description: 'Seu bairro',
    example: 'Parque Manibura',
  }),
  city: z.string().min(1, { error: 'Cidade obrigatório' }).meta({
    description: 'Sua cidade',
    example: 'Fortaleza',
  }),
  state: z.string().min(1, { error: 'Estado obrigatório' }).meta({
    description: 'Seu estado',
    example: 'Ceará',
  }),
  zipCode: z.string().min(1, { error: 'CEP obrigatório' }).meta({
    description: 'Seu CEP',
    example: '60821-780',
  }),
  status: z.string().min(1, { error: 'Status obrigatório' }).meta({
    description: 'Seu status',
    example: 'active',
  }),
});

export type CreatePropertyType = z.infer<typeof createPropertySchema>;

export class CreatePropertyDto extends createZodDto(createPropertySchema) {}
