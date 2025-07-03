// Importa el decorador ApiProperty para documentación Swagger
import { ApiProperty } from "@nestjs/swagger";

// DTO para login de usuario
export class LoginDto {
    @ApiProperty({required: true}) // Email es requerido
    email: string;

    @ApiProperty({required: true}) // Password es requerido
    password: string;
}