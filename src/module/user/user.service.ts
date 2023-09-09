import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto, UserLoginDto, UserListPageDto } from './user.dto';
import { ErrResult } from '@/common/result/result';
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
      if (isExistUsername) throw new ErrResult(201, '用户名已被注册');

      const isExistEmail = await this.userEntityRepository.findOne({
        where: {
          email: data.email,
        },
      });
      if (isExistEmail) throw new ErrResult(201, '邮箱已被注册');

      await this.userEntityRepository.save(data);
      return 'ok';
    } catch (error) {
      throw new ErrResult(500, error.message);
    }
  }
  async emailRegister(data: UserRegisterDto): Promise<any> {
    try {
    } catch (error) {}
  }

  async login(params: UserEntity): Promise<string> {
    return await this.jwtService.sign(
      {
        username: params.username,
        id: params.id,
      },
      { secret: this.configService.get('jwt_secret') },
    );
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
