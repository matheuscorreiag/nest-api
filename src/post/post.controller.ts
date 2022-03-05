import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  getPosts() {
    return this.postService.getPosts();
  }

  @Post('/create')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
