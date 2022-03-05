import { IsNotEmpty } from 'class-validator';
import { IPost } from '../post.interface';

export class GetPostDto {
  @IsNotEmpty()
  post: IPost[];
}
