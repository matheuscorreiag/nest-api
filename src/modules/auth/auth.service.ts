import { Injectable } from '@nestjs/common';
import prisma from '../../database';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import InvalidCredentialsException from '../../errors/InvalidCredentialsException';
import { PrismaCatchError } from '../../interfaces';
import ErrorResponse from '../../errors/ErrorResponse';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login({ email, password }: AuthLoginDto) {
    const user = await prisma.user
      .findFirst({
        where: {
          email,
        },
      })
      .catch((err: PrismaCatchError) => {
        throw new ErrorResponse(err.meta.cause);
      });

    const isMatch = await bcrypt.compare(password, user?.password || '');

    if (!user || !isMatch) {
      throw new InvalidCredentialsException();
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
