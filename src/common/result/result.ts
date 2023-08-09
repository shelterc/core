import { HttpException, HttpStatus } from '@nestjs/common';

export class errResult extends HttpException {
  constructor(code?: number, msg?: string, data?: unknown) {
    super({ code, msg, data }, HttpStatus.OK);
  }
}
