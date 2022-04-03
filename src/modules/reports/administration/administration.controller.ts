import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiCommonResponse } from '../../../shared/response.dto';
import { CreateAdministrationReportDto } from './dto/create-administration.dto';

import { AdministrationService } from './administration.service';
import { UpdateAdministrationDto } from './dto/update-administration.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('/reports/administration')
export class AdministrationController {
  constructor(
    private administrationService: AdministrationService, //IReportsService<IAdministrationReport>,
  ) {}

  @ApiTags('reports')
  @Post()
  create(
    @Req() req: any,
    @Body() createAdministrationDto: CreateAdministrationReportDto,
  ): Promise<ApiCommonResponse> {
    return this.administrationService.create(req.user, createAdministrationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrationService.findOne(id);
  }

  @ApiTags('reports')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdministrationDto: UpdateAdministrationDto,
  ) {
    const typeOfReport = 'administration';

    return this.administrationService.update(
      id,
      updateAdministrationDto,
      typeOfReport,
    );
  }

  @ApiTags('reports')
  @Delete(':id')
  remove(@Param('id') id: string) {
    const typeOfReport = 'administration';
    return this.administrationService.remove(id, typeOfReport);
  }
}
