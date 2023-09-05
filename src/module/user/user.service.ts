import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto, UserLoginDto, UserListPageDto } from './user.dto';
import { errResult } from '@/common/result/result';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(data: UserRegisterDto): Promise<string> {
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

      await this.userEntityRepository.save(data);
      return 'ok';
    } catch (error) {
      throw error;
      // throw new errResult(500, '服务端出错', error);
    }
  }
  async emailRegister(data: UserRegisterDto): Promise<any> {
    try {
    } catch (error) {}
  }

  async login(params: UserEntity) {
    // return 'login';
    const token = this.jwtService.sign(params.id, {
      secret: this.configService.get('jwt_secret'),
    });
    return token;
  }

  async list(params: UserListPageDto) {
    const count = await this.userEntityRepository.count();
    const list = await this.userEntityRepository
      .createQueryBuilder()
      .orderBy('created_at')
      .skip(params.page || 0)
      .take(params.limit || 10)
      .getMany();
    return {
      list,
      count,
    };
  }
}
