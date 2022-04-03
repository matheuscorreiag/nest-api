import { reportType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEmpty,
} from 'class-validator';

export class UpdateAdministrationDto {
  @IsEnum(reportType)
  @IsEmpty()
  @IsOptional()
  reportType: reportType;

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
