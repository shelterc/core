import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { registerUserDto } from './user.dto';

@Controller('/user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() body: registerUserDto) {
    return this.userService.register(body);
  }
  @Get()
  @ApiOperation({ summary: '测试' })
  async test() {
    // return this.userService.test();
  }
}
