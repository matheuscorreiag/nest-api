import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAdministrationDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  farm: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  manager: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  correctUseOfEPI: number;
}
