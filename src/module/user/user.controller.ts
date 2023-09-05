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
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '用户列表' })
  @ApiBearerAuth()
  async list(@Param() param: UserListPageDto) {
    return this.userService.list(param);
  }
}
