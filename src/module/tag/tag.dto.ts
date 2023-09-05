import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class TagSetDto {
  @ApiProperty({ example: 'typescript', description: '标签名', required: true })
  @IsNotEmpty({ message: '标签名不能为空' })
  @MaxLength(12, { message: '标签长度最长不超过12位' })
  @MinLength(2, { message: '标签长度最短不少于2位' })
  name: string;
}

export class TagListDto {
  @ApiProperty({ example: '1', description: '页数', required: false })
  page: string;

  @ApiProperty({ example: '10', description: '条数', required: false })
  pageSize: string;
}
