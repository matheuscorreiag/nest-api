import { reportType } from '@prisma/client';

export interface IReports
  extends IAdministrationReport,
    IHealthSecurityReport,
    IFarmReport {}

export interface IAdministrationReport {
  id?: string;
  reportType: reportType;
  date?: Date;
  farm: string;
  manager: string;
  correctUseOfEpi?: string;
}

export interface IHealthSecurityReport {
  id?: string;
  reportType: reportType;
  date?: Date;
  farm: string;
  manager: string;
  correctUseOfStructureEquipment?: string;
}
export interface IFarmReport {
  id?: string;
  reportType: reportType;
  date?: Date;
  farm: string;
  manager: string;
  area?: string;
  size?: string;
}
