import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SALT_ROUNDS } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import prisma from '../../database';
import { selectUser } from '../../prisma/select';
import { ApiResponse } from '../../shared/response';
import { isDataFound, userExists } from '../../shared/existsFields';
import { PrismaCatchError } from '../../interfaces';
import ErrorResponse from '../../errors/ErrorResponse';

@Injectable()
export class UserService {
  async getUser() {
    const data = await prisma.user.findMany({ select: selectUser });

    await isDataFound(data);

    return { statusCode: 200, data };
  }
  async findOne(id: string): Promise<ApiResponse> {
    const user = await prisma.user.findFirst({ where: { id } });

    await isDataFound(user);

    return { statusCode: 200, data: user };
  }
  async create({
    email,
    name,
    password,
    role,
  }: CreateUserDto): Promise<ApiResponse> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await userExists(email);

    await prisma.user
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
    return { statusCode: 200, message: 'Usuário criado com sucesso' };
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
