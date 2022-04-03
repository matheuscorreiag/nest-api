import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { AdministrationModule } from './administration/administration.module';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
  imports: [AdministrationModule],
})
export class ReportsModule {}
