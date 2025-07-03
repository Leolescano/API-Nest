import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// Servicio de usuarios
@Injectable()
export class UsersService {
  // Inyecta el servicio Prisma
  constructor(private readonly prismaService: PrismaService) {}
  
  // Crea un nuevo usuario en la base de datos
  async create(createUserDto: CreateUserDto) {
    // Hashea la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      }
    });
  }
 
  // Obtiene todos los usuarios
  findAll() {
    return this.prismaService.user.findMany();
  }

  // Obtiene un usuario por ID
  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
  
  // Actualiza um usuário por ID
  async update(id: string, updateUserDto: UpdateUserDto) {
    let data: any = {};
    for (const key in updateUserDto) {
      if (updateUserDto[key] !== undefined) {
        data[key] = updateUserDto[key];
      }
    }
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  // Elimina un usuario por ID
  async remove(id: string) {
    // Buscar el usuario antes de eliminar
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    if (user.role === 'ADMIN') {
      throw new ForbiddenException('No se puede eliminar un usuario con rol ADMIN');
    }
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}