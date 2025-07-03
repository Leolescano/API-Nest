// Importa SetMetadata para crear decoradores personalizados
import { SetMetadata } from "@nestjs/common";

// Clave que identifica si una ruta es pública
export const IS_PUBLIC_KEY = 'isPublic';

// Decorador para marcar una ruta como pública (sin autenticación)
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)