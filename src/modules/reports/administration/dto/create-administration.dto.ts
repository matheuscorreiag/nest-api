import { reportType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAdministrationReportDto {
  @IsEnum(reportType)
  @IsNotEmpty()
  reportType: reportType;

  @IsNotEmpty()
  @IsString()
  farm: string;

  @IsNotEmpty()
  @IsString()
  manager: string;

  @IsNotEmpty()
  @IsNumber()
  correctUseOfEPI: number;
}
