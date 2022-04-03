import { Injectable } from '@nestjs/common';
import { IAdministrationReport } from '../../../shared/interfaces/reports.interface';
import { ReportsService } from '../reports.service';

@Injectable()
export class AdministrationService extends ReportsService<IAdministrationReport> {}
