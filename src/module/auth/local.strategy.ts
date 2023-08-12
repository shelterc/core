import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
    private readonly authLoginDto: AuthLoginDto,
  ) {
    const params: IStrategyOptions = {
      usernameField: authLoginDto.username,
      passwordField: authLoginDto.password,
    };
    super(params);
  }
  async validate(): Promise<any> {}
}
