import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    CompanyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, // mantém o AppService normal
    {
      provide: APP_PIPE, // token especial do Nest para pipes globais
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
