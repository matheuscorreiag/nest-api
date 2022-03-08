import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from 'src/database';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login({ email, password }: AuthLoginDto) {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = {
      name: user.name,
      id: user.id,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { statusCode: 200, token };
  }
}
