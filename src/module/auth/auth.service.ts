import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './auth.dto';
import { compareSync } from 'bcryptjs';
import { errResult } from 'src/common/result/result';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // 校验用户身份（本地策略方式）
  async validateUserLocalStrategy(e: AuthLoginDto): Promise<UserEntity> {
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

    return user;
  }

  // 解密token(策略方式)
  async validateTokenStrategy(id: string): Promise<any> {
    // 解密token，如果解密成功会返回数据，如果打印不到这个e证明token有问题
    return await this.userEntityRepository.findOne({ where: { id } });
  }
}
