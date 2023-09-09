import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoggerService } from '@/common/logger/logger.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  private reflector: Reflector;
  private Logger: LoggerService;
  constructor() {
    this.reflector = new Reflector();
    this.Logger = new LoggerService();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isAuth) return true;
    return this.canActivate(context);
  }
}
