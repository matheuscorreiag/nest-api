import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
}
