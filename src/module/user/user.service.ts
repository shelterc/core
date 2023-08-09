import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { registerUserDto } from './user.dto';
import { errResult } from 'src/common/result/result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async register(data: registerUserDto): Promise<any> {
    try {
      const user = await this.userEntityRepository.findOne({
        where: {
          username: data.username,
        },
      });
      const user1 = await this.userEntityRepository.findOne({
        where: {
          email: data.email,
        },
      });
      if (user) throw new errResult(201, '用户名已被注册');
      if (user1) throw new errResult(201, '邮箱已被注册');
      return '12312';
    } catch (error) {
      throw new errResult(500, 'error', error);
    }
  }
  async emailRegister(data: registerUserDto): Promise<any> {
    try {
    } catch (error) {}
  }
}
