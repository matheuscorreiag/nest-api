import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async getUser() {
    const data = await prisma.user.findMany({ include: { post: true } });

    if (data.length === 0) throw new NotFoundException('No users found');
    return { statusCode: 200, data };
  }
  async findOne(id: string) {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('No users found');

    return { statusCode: 200, data: user };
  }
  async create({ email, name, password }: CreateUserDto) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
  async update(id: string, { email, name }: UpdateUserDto) {
    return await prisma.user.update({
      where: { id },
      data: {
        email,
        name,
      },
    });
  }
  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
