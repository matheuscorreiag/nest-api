import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from 'src/database';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  async getPosts() {
    const data = await prisma.post.findMany();

    if (data.length === 0) {
      throw new NotFoundException('No posts found');
    }
    return { statusCode: 200, data };
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
