import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postService.create(createPostDto, req);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('/:id')
  findAllByUser(@Param('id') id: string) {
    return this.postService.findAllByUser(+id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
