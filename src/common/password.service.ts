import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PasswordService {
  // Usamos o Logger integrado do NestJS em vez do console.error
  private readonly logger = new Logger(PasswordService.name);

  constructor(private configService: ConfigService) {}

  /**
   * Gera o hash de uma senha
   */
  async hash(password: string): Promise<string> {
    const rounds = this.getNumberOfRounds();
    // Como você já instalou ou tipou o bcryptjs, o type casting garante conformidade com o ESLint
    return await bcryptjs.hash(password, rounds);
  }

  /**
   * Compara a senha fornecida com a senha armazenada
   */
  async compare(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcryptjs.compare(providedPassword, storedPassword);
    return isMatch;
  }

  /**
   * Define a quantidade de rounds baseado no ambiente
   */
  private getNumberOfRounds(): number {
    const env = this.configService.get<string>('NODE_ENV');
    return env === 'production' ? 14 : 1;
  }
}
