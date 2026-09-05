import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '../../generated/prisma/client';
import { Response } from 'express';

interface PrismaDriverAdapterError {
  cause?: {
    constraint?: {
      fields?: string | string[];
    };
  };
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const driverAdapterError = exception.meta?.driverAdapterError as
          PrismaDriverAdapterError | undefined;
        const target =
          (exception.meta?.target as string[]) ||
          driverAdapterError?.cause?.constraint?.fields ||
          [];

        const fields = Array.isArray(target)
          ? target.join(', ')
          : String(target);

        response.status(status).json({
          statusCode: status,
          error: 'Conflict',
          message: fields
            ? `O valor fornecido para o(s) campo(s) [${fields}] já está em uso.`
            : 'Registro duplicado detectado.',
        });
        break;
      }

      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          error: 'Not Found',
          message:
            'O registro solicitado não foi encontrado ou já foi removido.',
        });
        break;
      }

      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          error: 'Bad Request',
          message:
            'Falha na relação de dados. Um registro associado necessário não foi encontrado.',
        });
        break;
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
