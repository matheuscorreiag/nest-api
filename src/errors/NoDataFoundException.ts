import { HttpException, HttpStatus } from '@nestjs/common';

export default class NoDataFoundException extends HttpException {
  constructor() {
    super('Nenhum registro encontrado', HttpStatus.NOT_FOUND);
  }
}
