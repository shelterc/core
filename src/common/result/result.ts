import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrResult extends HttpException {
  constructor(code?: number, msg?: string, data?: unknown | {}) {
    super({ code, msg, data }, HttpStatus.OK);
  }
}
