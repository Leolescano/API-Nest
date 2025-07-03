// Importa el decorador Injectable para servicios
import { Injectable } from '@nestjs/common';
// Importa el cliente Prisma generado automáticamente
import { PrismaClient } from '@prisma/client';

// Servicio que extiende el cliente Prisma para usarlo con inyección de dependencias
@Injectable()
export class PrismaService extends PrismaClient {
    // Aquí puedes agregar métodos personalizados si lo necesitas
}
