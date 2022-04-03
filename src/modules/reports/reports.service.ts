import { Injectable, Req, Type } from '@nestjs/common';
import prisma from '../../database';
import { ApiCommonResponse } from '../../shared/response.dto';
import UserNotFoundException from '../user/errors/UserNotFoundException';
import ErrorResponse from '../../errors/ErrorResponse';
import { IReportsService } from './interfaces';
import { Prisma, reportType } from '@prisma/client';
import { isDataFound } from '../../shared/existsFields';

@Injectable()
export class ReportsService<Type> implements IReportsService<Type> {
  async create(@Req() req: any, data: Type): Promise<ApiCommonResponse> {
    const user = req?.user;

    if (!user) throw new UserNotFoundException();

    await prisma.reports
      .create({
        data: {
          ...(data as unknown as Prisma.ReportsCreateInput),
          user: { connect: { id: user?.id } },
          date: new Date(),
        },
      })
      .catch((err) => {
        throw new ErrorResponse(err);
      });

    return { statusCode: 200, message: 'Report created' };
  }

  async findAll() {
    const reports = await prisma.reports.findMany();

    await isDataFound(reports);

    return { statusCode: 200, data: reports };
  }

  async findOne(id: string): Promise<ApiCommonResponse> {
    const report = await prisma.reports.findFirst({
      where: {
        id,
      },
    });

    await isDataFound(report);

    return { statusCode: 200, data: report };
  }

  async update(
    id: string,
    updateReportDto: Type,
    typeOfReport: reportType,
  ): Promise<ApiCommonResponse> {
    const report = await prisma.reports.findFirst({
      where: { id, reportType: typeOfReport },
    });

    await isDataFound(report);

    await prisma.reports
      .update({
        where: {
          id: report.id,
        },
        data: updateReportDto,
      })
      .catch((err) => {
        new ErrorResponse(err);
      });

    return { statusCode: 200, message: 'Report updated' };
  }

  async remove(
    id: string,
    typeOfReport?: reportType,
  ): Promise<ApiCommonResponse> {
    const reports = await prisma.reports.findFirst({
      where: { id, reportType: typeOfReport },
    });

    await isDataFound(reports);

    await prisma.reports
      .delete({
        where: { id: reports?.id },
      })
      .catch((err) => {
        throw new ErrorResponse(err.meta.cause);
      });

    return { statusCode: 200, message: 'Report deleted' };
  }
}
