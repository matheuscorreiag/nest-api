import { Injectable } from '@nestjs/common';
import prisma from '../../database';
import { IAuthUser, PrismaCatchError } from '../../interfaces';
import { ApiCommonResponse } from '../../shared/response.dto';
import { isDataFound, userExistsById } from '../../shared/existsFields';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import ErrorResponse from '../../errors/ErrorResponse';

@Injectable()
export class PostService {
  async create({ name, description }: CreatePostDto, req: any) {
    const user: IAuthUser = req.user;

    await userExistsById(user?.id);

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
      .catch((err: PrismaCatchError) => {
        throw new ErrorResponse(err.meta.cause);
      });

    return { statusCode: 200, data };
  }

  async findAll() {
    const data = await prisma.post.findMany().catch((err: PrismaCatchError) => {
      throw new ErrorResponse(err.meta.cause);
    });

    await isDataFound(data);
    return { statusCode: 200, data };
  }

  async findAllByUser(userId: string) {
    const data = await prisma.post
      .findMany({
        where: {
          id: userId,
        },
      })
      .catch((err: PrismaCatchError) => {
        throw new ErrorResponse(err.meta.cause);
      });

    await isDataFound(data);

    return { statusCode: 200, data };
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<ApiCommonResponse> {
    const { name, description } = updatePostDto;

    await userExistsById(id);

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
    await userExistsById(id);
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
