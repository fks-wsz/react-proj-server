import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerException extends HttpException {
  constructor(message: string = '服务器内部错误') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
