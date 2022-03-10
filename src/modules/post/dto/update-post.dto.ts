import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  id: string;
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
}
