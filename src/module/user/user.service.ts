import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto, UserLoginDto } from './user.dto';
import { errResult } from 'src/common/result/result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async register(data: UserRegisterDto): Promise<any> {
    try {
      const isExistUsername = await this.userEntityRepository.findOne({
        where: {
          username: data.username,
        },
      });
      if (isExistUsername) throw new errResult(201, '用户名已被注册');
      const isExistEmail = await this.userEntityRepository.findOne({
        where: {
          email: data.email,
        },
      });
      if (isExistEmail) throw new errResult(201, '邮箱已被注册');

      return await this.userEntityRepository.save(data);
    } catch (error) {
      throw error;
      // throw new errResult(500, '服务端出错', error);
    }
  }
  async emailRegister(data: UserRegisterDto): Promise<any> {
    try {
    } catch (error) {}
  }

  async login(data: UserLoginDto) {
    return 'login`';
  }
}
