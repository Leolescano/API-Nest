// Importa utilidades de NestJS para controladores y manejo de peticiones
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
// Importa el DTO para login
import { LoginDto } from './dto/login.dto';
// Importa decorador para documentación Swagger
import { ApiTags } from '@nestjs/swagger';
// Importa el servicio de autenticación
import { AuthService } from './auth.service';
// Importa el decorador personalizado para rutas públicas
import { Public } from './decorators/public.decorator';

// Controlador para rutas de autenticación
@Controller('auth')
@ApiTags('Auth') // Tag para Swagger
export class AuthController {
    // Inyecta el servicio de autenticación
    constructor(private readonly authService: AuthService) {}
    
    // Endpoint para login
    @Post('login')
    @Public() // Indica que esta ruta es pública (no requiere JWT)
    async login(@Body() data: LoginDto){
        // Valida el usuario y obtiene el token
        const userToken = await this.authService.validateUser(data);
        if (!userToken) {
            // Si no existe el usuario, lanza excepción 404
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Devuelve el token JWT
        return userToken;
    }
}
