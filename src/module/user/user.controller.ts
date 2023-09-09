import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserListPageDto, UserLoginDto, UserRegisterDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { CurrentUser, IsPublic } from '@/common/decorator';
import { UserEntity } from './user.entity';

@Controller('/user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() params: UserRegisterDto): Promise<string> {
    return this.userService.register(params);
  }

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @IsPublic()
  async login(@Body() _: UserLoginDto, @CurrentUser() user: UserEntity) {
    return this.userService.login(user);
  }

  @Get('list')
  @ApiOperation({ summary: '用户列表' })
  @ApiBearerAuth()
  async list(@Param() param: UserListPageDto) {
    return this.userService.list(param);
  }
}
