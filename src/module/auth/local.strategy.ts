import { Injectable, Optional } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { IStrategyOptions } from 'passport-local';
import { AuthModuleOptions, PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
    @Optional() options: AuthModuleOptions,
  ) {
    const params: IStrategyOptions = {
      usernameField: 'username',
      passwordField: 'password',
    };
    super({ ...params, ...options, property: 'test' });
  }
  // 返回一个非空值表示验证通过，返回 null 或抛出异常表示验证失败。
  async validate(username: string, password: string): Promise<UserEntity> {
    console.log('进入本地策略');
    // return '不想多说';
    return this.authService.validateUserLocalStrategy({ username, password });
  }
}
