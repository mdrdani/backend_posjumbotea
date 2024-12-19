import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('OpenAPI Backend-JumboTea')
    .setDescription('The OpenAPI Backend-JumboTea API description')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header'},
      'accessToken'
    )
    .setVersion('1.0')
    .addTag('users', 'User related endpoints')
    .addTag('auth', 'Auth related endpoints')
    .addTag('products', 'Product related endpoints')
    .addTag('orders', 'Order related endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('openapi', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
