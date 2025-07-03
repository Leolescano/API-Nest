import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// Guard para proteger rutas usando JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Inyecta el reflector para leer metadatos de los decoradores
  constructor(private reflector: Reflector) {
    super();
  }
  
  // Determina si la ruta puede ser accedida
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Verifica si la ruta está marcada como pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,
      [
        context.getHandler(), // Handler del endpoint
        context.getClass(),   // Clase del controlador
      ]);
    if (isPublic) {
      // Si es pública, permite el acceso sin autenticación
      return true;
    } 
    
    // Si no es pública, aplica el guard de JWT
    return super.canActivate(context);
  }
}
