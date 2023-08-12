import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './auth.dto';
import { compareSync } from 'bcryptjs';
import { errResult } from 'src/common/result/result';

@Injectable()
export class AuthService {
  constructor(
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // 校验用户身份（本地策略方式）
  async validateUserStrategy(e: AuthLoginDto): Promise<any> {
    // console.log(e)
    // const user = await this.userEntityRepository.findOne({
    //   username: e.username,
    // })

    // let sql = `select * from user where user.username = '${e.username}'`
    // const user: UserEntity = await this.userEntityRepository.query(sql)

    // 当实体类设置了隐藏列，如果想要查出来，要么使用原生查询，要么使用createQueryBuilder(),
    // createQueryBuilder()参数接收一个别名，如果不传入别名，那么就算使用了addSelect(),这个隐藏列也不会被查询出来
    const user: UserEntity = await this.userEntityRepository
      .createQueryBuilder('user')
      .select()
      .where(`user.username = '${e.username}'`)
      .addSelect('user.password')
      .getOne();
    if (!user) {
      throw new errResult(201, '没有找到当前用户');
    }
    const status = compareSync(e.password, user.password);
    if (!status) {
      throw new errResult(400, '密码不正确');
    }
    delete user.password;
    return user;
  }

  // 校验用户身份(中间件拦截名单方式)
  async validateUserMiddleware(e: AuthLoginDto): Promise<any> {
    const user: UserEntity = await this.userEntityRepository
      .createQueryBuilder('user')
      .select()
      .where(`user.username = '${e.username}'`)
      .addSelect('user.password')
      .getOne();
    if (!user) {
      throw new errResult(201, '没有找到当前用户');
    }
    const status = compareSync(e.password, user.password);
    if (!status) {
      throw new errResult(400, '密码不正确');
    }
    delete user.password;
    const token = this.jwtService.sign(user.id.toString());
    return { token, msg: '登录成功' };
  }

  // 解密token(策略方式)
  async validateTokenStrategy(e: number): Promise<any> {
    // 解密toekn，如果解密成功会返回数据，如果打印不到这个e证明tokken有问题
    // return await this.userEntityRepository.findOne();
    return '';
  }
}
