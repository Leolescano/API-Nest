// Importa el factory de NestJS para crear la aplicación
import { NestFactory } from '@nestjs/core';
// Importa el módulo raíz de la aplicación
import { AppModule } from './app.module';
// Importa utilidades para documentación Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// Importa el guard de autenticación JWT
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

// Función principal que arranca la aplicación
async function bootstrap() {
  // Crea la aplicación NestJS usando el módulo principal
  const app = await NestFactory.create(AppModule);
  
  // Configura la documentación Swagger
  const config = new DocumentBuilder()
  .setTitle('Auth API') // Título de la API
  .setDescription('API for user authentication') // Descripción
  .setVersion('1.0') // Versión
  .addTag('Auth') // Tag para endpoints de autenticación
  .addTag('Users') // Tag para endpoints de usuarios
  .addBearerAuth({ // Configura autenticación Bearer para Swagger
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    name: "Authorization",
    description: 'enter your Bearer token'
  })
  .addSecurityRequirements('bearer') // Requiere Bearer token
  .build();
  
  // Crea el documento Swagger
  const document = SwaggerModule.createDocument(app, config);
  // Expone la documentación en /api
  SwaggerModule.setup('api', app, document);

  // Obtiene el guard de autenticación JWT
  const jwtAuthGuard = app.get(JwtAuthGuard);
  // Aplica el guard globalmente a toda la app
  app.useGlobalGuards(jwtAuthGuard, new RolesGuard(app.get('Reflector')));

  // Inicia la aplicación en el puerto definido o 3000
  await app.listen(process.env.PORT ?? 3000);
}
// Llama a la función principal para arrancar la app
bootstrap();
