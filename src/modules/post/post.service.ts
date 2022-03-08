import { Injectable } from '@nestjs/common';
import prisma from 'src/database';
import { IAuthUser } from 'src/interfaces';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  async create({ name, description }: CreatePostDto, req: any) {
    const user: IAuthUser = req.user;
    const data = await prisma.post.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return data;
  }

  findAll() {
    return `This action returns all post`;
  }

  findAllByUser(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
