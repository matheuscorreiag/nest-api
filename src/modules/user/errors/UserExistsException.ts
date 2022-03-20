import { HttpException, HttpStatus } from '@nestjs/common';

export default class UserExistsException extends HttpException {
  constructor() {
    super('Usuário já existe', HttpStatus.BAD_REQUEST);
  }
}
