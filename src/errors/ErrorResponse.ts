import { BadRequestException } from '@nestjs/common';

export default class ErrorResponse extends BadRequestException {
  constructor(error: string) {
    super({ statusCode: 400, error: error });
  }
}
