import { IsNotEmpty, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Post must have a title' })
  @Length(3)
  name: string;

  @IsNotEmpty({ message: 'Post must have a description' })
  @Length(3)
  description: string;

  @IsNotEmpty({ message: 'Post must have a user' })
  userId: string;
}
