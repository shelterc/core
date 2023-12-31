import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsValidEmail } from './user.dto.validate';

export class UserBaseDto {
  @ApiProperty({ example: 'Answers', description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ example: '123456', description: '密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export class UserRegisterDto extends UserBaseDto {
  @ApiProperty({
    example: 'xxx@gmail.com',
    description: '注册邮箱',
    required: true,
  })
  @IsNotEmpty({ message: '注册邮箱不能为空' })
  @Validate(IsValidEmail)
  email: string;
}

export class UserLoginDto extends UserBaseDto {}

export class UserListPageDto {
  @ApiProperty({
    example: 1,
    description: '页码',
    required: false,
  })
  page: number;

  @ApiProperty({
    example: 1,
    description: '记录数',
    required: false,
  })
  limit: number;
}
