import { IsNotEmpty, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Post must must have a title' })
  @Length(3)
  name: string;

  @IsNotEmpty({ message: 'Post must must have a content' })
  @Length(3)
  description: string;
}
