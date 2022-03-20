import { HttpException, HttpStatus } from '@nestjs/common';

export default class NoUsersFoundException extends HttpException {
  constructor() {
    super('Nenhum usuário encontrado', HttpStatus.NOT_FOUND);
  }
}
