import { IsNotEmpty, IsOptional } from 'class-validator';

export class ApiResponse {
  @IsNotEmpty()
  statusCode: number;
  @IsOptional()
  data?: any;
  @IsOptional()
  error?: string;
}
