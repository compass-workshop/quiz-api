import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Workshop Quiz OpenAPI specification')
    .setDescription('Quiz API specification')
    .setVersion('1.0')
    .addTag('tests')
    .addTag('analytics')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('quiz-api', app, document);

  await app.listen(3000);
}
bootstrap();
