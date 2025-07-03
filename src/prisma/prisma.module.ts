// Importa el decorador Module de NestJS
import { Module } from '@nestjs/common';
// Importa el servicio de Prisma
import { PrismaService } from './prisma.service';

// Módulo para proveer el servicio de Prisma
@Module({
  providers: [PrismaService], // Proveedor del servicio Prisma
  exports: [PrismaService],   // Exporta el servicio para otros módulos
})
export class PrismaModule {}
