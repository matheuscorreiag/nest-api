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
import { ApiCommonResponse } from '../../shared/response.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiSecurity('bearer')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiTags('post')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: any,
  ): Promise<ApiCommonResponse> {
    return this.postService.create(createPostDto, req);
  }

  @ApiTags('post')
  @Get()
  findAll(): Promise<ApiCommonResponse> {
    return this.postService.findAll();
  }

  @ApiTags('post')
  @Get('/:id')
  findAllByUser(@Param('id') id: string): Promise<ApiCommonResponse> {
    return this.postService.findAllByUser(id);
  }

  @ApiTags('post')
  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<ApiCommonResponse> {
    return this.postService.update(id, updatePostDto);
  }

  @ApiTags('post')
  @Delete('/delete/:id')
  remove(@Param('id') id: string): Promise<ApiCommonResponse> {
    return this.postService.remove(id);
  }
}
