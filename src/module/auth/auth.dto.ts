import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({ description: '用户名', required: true })
  username: string;
  @ApiProperty({ description: '密码', required: true })
  password: string;
}
