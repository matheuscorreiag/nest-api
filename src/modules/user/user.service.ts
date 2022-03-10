import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import prisma from 'src/database';
import ErrorResponse from 'src/errors/ErrorResponse';
import { PrismaCatchError } from 'src/interfaces';
import { selectUser } from 'src/prisma/select';
import { ApiResponse } from 'src/shared/responses/response';
import { SALT_ROUNDS } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async getUser() {
    const data = await prisma.user.findMany({ select: selectUser });

    if (data.length === 0) throw new NotFoundException('No users found');
    return { statusCode: 200, data };
  }
  async findOne(id: string): Promise<ApiResponse> {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('No users found');

    return { statusCode: 200, data: user };
  }
  async create({
    email,
    name,
    password,
    role,
  }: CreateUserDto): Promise<ApiResponse> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const data = await prisma.user
      .create({
        data: {
          name,
          email,
          role,
          password: hashedPassword,
        },
      })
      .catch((err: PrismaCatchError) => {
        throw new ErrorResponse(err.meta.cause);
      });
    return { statusCode: 200, data };
  }
  async update(
    id: string,
    { email, name }: UpdateUserDto,
  ): Promise<ApiResponse> {
    const data = await prisma.user
      .update({
        where: { id },
        data: {
          email,
          name,
        },
      })
      .catch((err: PrismaCatchError) => {
        throw new ErrorResponse(err.meta.cause);
      });

    return { statusCode: 200, data };
  }
  async delete(id: string): Promise<ApiResponse> {
    const data = await prisma.user
      .delete({
        where: { id },
      })
      .catch((err) => {
        throw new ErrorResponse(err.meta.cause || err.meta.field_name);
      });
    return { statusCode: 200, data };
  }
}
