import { Injectable } from '@nestjs/common';
import prisma from 'src/database';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  async getPosts() {
    return await prisma.post.findMany();
  }
  async createPost({ name, description, userId }: CreatePostDto) {
    return await prisma.post.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
