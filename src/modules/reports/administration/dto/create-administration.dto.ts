import { reportType } from '@prisma/client';
import { Equals, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdministrationReportDto {
  @Equals(reportType.administration)
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
