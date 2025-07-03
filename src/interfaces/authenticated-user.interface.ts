// Importa el tipo Role desde Prisma
import { Role } from "@prisma/client";

// Interfaz que extiende Request para incluir datos del usuario autenticado
export interface AuthenticatedRequest extends Request {
    user: {
        id: string; // ID del usuario
        email: string;  // Email del usuario
        role: Role;     // Rol del usuario (USER o ADMIN)
    }
}