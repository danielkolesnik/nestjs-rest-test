import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// local dependencies
import { AppModule } from './app.module';
import ConfigService from './configs/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nestjs Rest Test API')
    .setDescription('Nestjs Rest Test API documentation')
    .setVersion('1.0.0a')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  // Bootstrap server
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.getApiPort());
}
bootstrap();
