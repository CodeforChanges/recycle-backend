import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Google Solution Challenge')
    .setDescription('Google Solution Challenge API')
    .setVersion('0.1')
    .addTag('recycle')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(
    process.env.NODE_ENV === 'production' ? process.env.PORT : 8080,
  );
  
}
bootstrap();
