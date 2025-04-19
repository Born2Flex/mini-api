import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let portNumber = process.env.PORT ?? 3000;
  const config = new DocumentBuilder()
    .setTitle('Mini Notes API')
    .setDescription('CRUD API for managing notes')
    .addServer('http://localhost:' + portNumber + '/', 'Local environment')
    .setVersion('1.0')
    .addTag('notes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(portNumber);
}
bootstrap();
