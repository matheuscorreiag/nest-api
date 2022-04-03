import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IReports } from '../../shared/interfaces/reports.interface';
import { ReportsService } from './reports.service';

@ApiSecurity('bearer')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService<IReports>) {}

  @ApiTags('reports')
  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
  @ApiTags('reports')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
