import { Injectable } from '@nestjs/common';
import prisma from '../../database';
import ErrorResponse from '../../errors/ErrorResponse';
import { IAuthUser, PrismaCatchError } from '../../interfaces';
import { ApiCommonResponse } from '../../shared/response.dto';
import { isDataFound } from '../../shared/existsFields';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  async create({ name, description }: CreatePostDto, req: any) {
    const user: IAuthUser = req.user;

    const data = await prisma.post
      .create({
        data: {
          name,
          description,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      })
      .catch((err) => {
        throw new ErrorResponse(err.meta.cause);
      });
    return { statusCode: 200, data };
  }

  async findAll() {
    const data = await prisma.post.findMany();

    await isDataFound(data);
    return { statusCode: 200, data };
  }

  async findAllByUser(userId: string) {
    const data = await prisma.post.findMany({
      where: {
        userId,
      },
    });

    await isDataFound(data);

    return { statusCode: 200, data };
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<ApiCommonResponse> {
    const { name, description } = updatePostDto;

    const data = await prisma.post
      .update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
      })
      .catch((err: PrismaCatchError) => {
        throw new ErrorResponse(err.meta.cause);
      });

    return { statusCode: 200, data };
  }

  async remove(id: string) {
    const data = await prisma.post
      .delete({
        where: { id },
      })
      .catch((err: PrismaCatchError) => {
        throw new ErrorResponse(err.meta.cause);
      });
    return { statusCode: 200, data };
  }
}
