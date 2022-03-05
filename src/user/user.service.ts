import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/database';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  async getUser() {
    return await prisma.user.findMany({ include: { post: true } });
  }
  async create({ email, name, password }: CreateUserDto) {
    return await prisma.user
      .create({
        data: {
          name,
          email,
          password,
        },
      })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        return err;
      });
  }
  async update(id: string, { email, name }: UpdateUserDto) {
    return await prisma.user
      .update({
        where: { id },
        data: {
          email,
          name,
        },
      })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        return err;
      });
  }
  async delete(id: string) {
    return await prisma.user
      .delete({
        where: { id },
      })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        return err;
      });
  }
}
