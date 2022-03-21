import { IsNotEmpty, IsOptional } from 'class-validator';

export class ApiCommonResponse {
  @IsNotEmpty()
  statusCode: number;
  @IsOptional()
  data?: any;
  @IsOptional()
  error?: string;
  @IsOptional()
  message?: string;
}
