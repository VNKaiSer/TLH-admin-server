import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT;
  let httpsOptions = null;
  if (process.env.NODE_ENV == 'production') {
    httpsOptions = {
      key: fs.readFileSync('./secrets/private-key.key'),
      cert: fs.readFileSync('./secrets/public-certificate.crt'),
    };
  }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    httpsOptions
      ? {
          cors: true,
        }
      : {
          httpsOptions,
          cors: true,
        },
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Swagger Test')
    .setDescription('This is the test of swagger api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const APP_START_PORT = httpsOptions ? 443 : 80;
  await app.listen(APP_START_PORT, () =>
    console.log(`🚀 Server is running on port ${APP_START_PORT}`),
  );
}
bootstrap();
