import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiCommonResponse } from '../../../shared/response.dto';
import { CreateAdministrationReportDto } from './dto/create-administration.dto';

import { AdministrationService } from './administration.service';
import { UpdateAdministrationDto } from './dto/update-administration.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { NestRequest } from '../../../shared/interfaces/users.interface';

@ApiSecurity('bearer')
@Controller('/reports/administration')
export class AdministrationController {
  constructor(
    private administrationService: AdministrationService, //IReportsService<IAdministrationReport>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('reports')
  @Post()
  create(
    @Req() req: NestRequest,
    @Body() createAdministrationDto: CreateAdministrationReportDto,
  ): Promise<ApiCommonResponse> {
    return this.administrationService.create(req, createAdministrationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('reports')
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
    return this.administrationService.update(id, updateAdministrationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('reports')
  @Delete(':id')
  remove(@Param('id') id: string) {
    const typeOfReport = 'administration';
    return this.administrationService.remove(id, typeOfReport);
  }
}
