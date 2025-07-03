// Importa el decorador Module de NestJS
import { Module } from '@nestjs/common';
// Importa el servicio de usuarios
import { UsersService } from './users.service';
// Importa el controlador de usuarios
import { UsersController } from './users.controller';
// Importa el módulo de Prisma para acceso a la base de datos
import { PrismaModule } from 'src/prisma/prisma.module';

// Módulo de usuarios
@Module({
  controllers: [UsersController], // Controlador de usuarios
  providers: [UsersService],      // Servicio de usuarios
  imports: [PrismaModule],        // Módulo de acceso a la base de datos
})
export class UsersModule {}
