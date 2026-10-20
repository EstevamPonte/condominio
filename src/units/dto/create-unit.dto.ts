import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createUnitSchema = z.object({
  buildingId: z.uuid().meta({
    description: 'Building UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  }),
  userId: z.uuid().optional().meta({
    description: 'User UUID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  }),
  code: z.string().min(1, { message: 'Código da unidade é obrigatório' }).meta({
    description: 'Número ou código da unidade',
    example: '101',
  }),
  floor: z.number().int().optional().meta({
    description: 'Andar da unidade',
    example: 1,
  }),
  bedrooms: z
    .number()
    .int()
    .min(0, { message: 'Quantidade de quartos deve ser maior ou igual a 0' })
    .meta({
      description: 'Quantidade de quartos',
      example: 2,
    }),
  areaSqm: z.number().positive().optional().meta({
    description: 'Área em metros quadrados',
    example: 54.5,
  }),
  parkingSpaces: z.number().int().min(0).default(0).meta({
    description: 'Quantidade de vagas de garagem',
    example: 1,
  }),
  monthlyRent: z
    .number()
    .positive({ message: 'Valor do aluguel é obrigatório' })
    .meta({
      description: 'Valor base do aluguel mensal',
      example: 1500.0,
    }),
  condominiumFee: z.number().positive().optional().meta({
    description: 'Taxa de condomínio mensal',
    example: 280.0,
  }),
  status: z.string().default('available').meta({
    description:
      'Status da unidade (available, occupied, maintenance, inactive)',
    example: 'available',
  }),
  description: z.string().optional().meta({
    description: 'Descrição ou observações sobre o apartamento',
    example: 'Unidade nascente com varanda',
  }),
});

export type CreateUnitType = z.infer<typeof createUnitSchema>;

export class CreateUnitDto extends createZodDto(createUnitSchema) {}
