// Importa utilidades de NestJS para controladores y manejo de peticiones
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
// Importa el servicio de usuarios
import { UsersService } from './users.service';
// Importa los DTOs para crear y actualizar usuario
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto';
// Importa decorador para documentación Swagger
import { ApiTags } from '@nestjs/swagger';
// Importa el guard de autenticación JWT
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthenticatedRequest } from '../interfaces/authenticated-user.interface';


// Controlador para rutas de usuarios
@Controller('users')
@ApiTags('Users') // Tag para Swagger
export class UsersController {
  // Inyecta el servicio de usuarios
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para crear usuario
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Endpoint para obtener todos los usuarios (protegido por JWT)
  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  // Endpoint para obtener un usuario por ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Endpoint para actualizar los datos del usuario autenticado
  // Solo el usuario autenticado puede actualizar su propia información
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const user = req.user as AuthenticatedRequest['user'];
    return this.usersService.update(user.id, updateUserDto);
  }

  // Endpoint para eliminar el usuario autenticado
  // Solo el usuario autenticado puede eliminar su propia cuenta
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  removeMe(@Req() req: Request) {
    const user = req.user as AuthenticatedRequest['user'];
    return this.usersService.remove(user.id);
  }

  // Endpoint para actualizar un usuario por ID (solo ADMIN)
  // Solo los administradores pueden actualizar el rol de cualquier usuario por su ID
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  updateById(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    // Solo permitir actualizar el rol
    if ('role' in updateUserRoleDto) {
      return this.usersService.update(id, { role: updateUserRoleDto.role });
    }
    throw new BadRequestException('Solo se puede actualizar el rol de un usuario');
  }

  // Endpoint para eliminar un usuario por ID (solo ADMIN)
  // Solo los administradores pueden eliminar cualquier usuario por su ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  removeById(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
