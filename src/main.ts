import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';

const corsConfig = {
  "origin": process.env.FRONT_DOMAIN_NAME,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({    
    whitelist: true
    })
  );
  app.enableCors(corsConfig);
  await app.listen(3333);
}
bootstrap();
