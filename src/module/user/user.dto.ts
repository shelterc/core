import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class registerUserDto {
  @ApiProperty({ example: 'Answers', description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ example: '123456', description: '密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({
    example: 'xxx@gmail.com',
    description: '注册邮箱',
    required: true,
  })
  @IsNotEmpty({ message: '注册邮箱不能为空' })
  email: string;
}
