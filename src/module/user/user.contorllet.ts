import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserListPageDto, UserLoginDto, UserRegisterDto } from './user.dto';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '../../guard/auth.guard';
import { LoggerService } from 'src/common/logger/logger.service';

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
  async login(@Body() params: UserLoginDto) {
    return this.userService.login(params);
  }

  @Get('test')
  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: '用户列表' })
  async list(@Param() param: UserListPageDto) {
    return this.userService.list(param);
  }
}
