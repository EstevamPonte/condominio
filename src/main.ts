import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filter/prisma-client-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  app.use(cookieParser());
  const httpAdapter = app.getHttpAdapter();

  const config = new DocumentBuilder()
    .setTitle('Login Template')
    .setDescription('The login template API description')
    .setVersion('1.0')
    .addTag('login')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
