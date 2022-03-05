import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/database';
import { IUser } from 'src/interfaces/user.interface';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  async getUser(): Promise<User[]> {
    return await prisma.user.findMany();
  }
  async create({ email, name, password }: IUser): Promise<User> {
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
  async update(id: string, { email, name }: UpdateUserDto): Promise<User> {
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
  async delete(id: string): Promise<User> {
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
