import { ApiCommonResponse } from '../../../shared/response.dto';

export interface IReportsService<Type> {
  create(req: any, data: Type): Promise<ApiCommonResponse>;
  findAll(): Promise<ApiCommonResponse>;
  update(
    req: any,
    data: Type,
    typeOfReport: string,
  ): Promise<ApiCommonResponse>;
  findOne(id: string): Promise<ApiCommonResponse>;
}
