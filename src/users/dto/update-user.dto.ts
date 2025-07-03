// Importa PartialType para crear DTOs de actualización
import { PartialType } from '@nestjs/swagger';
// Importa el DTO base para crear usuario
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

// DTO para actualizar usuario (todos los campos son opcionales)
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// DTO para actualizar solo el rol del usuario
export class UpdateUserRoleDto {
  @ApiProperty({ required: true, enum: Role })
  role: Role;
}
