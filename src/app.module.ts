// Importa el decorador Module de NestJS
import { Module } from '@nestjs/common';
// Importa el módulo de usuarios
import { UsersModule } from './users/users.module';
// Importa el módulo de autenticación
import { AuthModule } from './auth/auth.module';

// Módulo raíz de la aplicación
@Module({
  imports: [UsersModule, AuthModule], // Importa los módulos de usuarios y autenticación
  controllers: [], // No hay controladores en el módulo raíz
  providers: [], // No hay proveedores en el módulo raíz
})
export class AppModule {}
