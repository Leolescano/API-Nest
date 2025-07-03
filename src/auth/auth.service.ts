import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {
    const foundUser = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
    if (!foundUser) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
    if (isPasswordValid) {
      return this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role
      });
    }
    return null;
  }
}
