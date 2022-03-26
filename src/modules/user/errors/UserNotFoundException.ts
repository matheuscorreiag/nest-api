import { HttpException, HttpStatus } from '@nestjs/common';

export default class UserNotFoundException extends HttpException {
  constructor() {
    super('Usuário não existe', HttpStatus.NOT_FOUND);
  }
}
