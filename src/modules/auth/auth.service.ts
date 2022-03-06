import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from 'src/database';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
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
      userId: user.id,
    };

    return { statusCode: 200, token: this.jwtService.sign(payload) };
  }
}
