import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '@/common/prisma.service';
import { PasswordService } from '@/common/password.service';
import { resetDatabase } from '../../test/reset-database';

beforeAll(async () => {
  await resetDatabase();
});

describe('UsersService', () => {
  let service: UsersService;

  // Mock do PrismaService: evita precisar de conexão real com o banco
  // pra rodar este teste unitário.
  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockPasswordService = {
    hash: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PasswordService, useValue: mockPasswordService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() faz hash da senha antes de salvar o usuário', async () => {
    mockPasswordService.hash.mockResolvedValue('senha-hasheada');
    mockPrismaService.user.create.mockResolvedValue({
      id: '1',
      name: 'Estevam',
      email: 'estevam@example.com',
      password: 'senha-hasheada',
      companyId: 'company-1',
    });

    const dto = {
      name: 'Estevam',
      email: 'estevam@example.com',
      password: '123456',
      companyId: 'company-1',
    };

    const result = await service.create(dto);

    expect(mockPasswordService.hash).toHaveBeenCalledWith('123456');
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({
      data: { ...dto, password: 'senha-hasheada' },
    });
    expect(result.password).toBe('senha-hasheada');
  });

  it('findAll() nunca retorna o campo password', async () => {
    await service.findAll();

    expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
      omit: { password: true },
    });
  });

  it('remove() retorna mensagem de sucesso', async () => {
    mockPrismaService.user.delete.mockResolvedValue({});

    const result = await service.remove('1');

    expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual({ message: 'Usuário removido com sucesso.' });
  });
});
