import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArticleSetDto {
  @ApiProperty({ example: 'TypeOrm在nest.js中的应用', description: '文章标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @ApiProperty({
    example: '首先先这样在那样，然后这样，接着再那样',
    description: '文章描述',
  })
  @IsNotEmpty({ message: '描述不能为空' })
  description: string;

  @ApiProperty({
    example: '这是文章内容文章内容文章内容文章内容文章内容',
    description: '文章内容',
  })
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @ApiProperty({ example: 'http://xxxxx.png', description: '文章封面' })
  cover_img: string;

  @ApiProperty({
    example: ['e8c8f8cd-b9c5-4d02-8077-457c3bcb64db'],
    description: '关联标签',
  })
  tag_ids: string[];

  @ApiProperty({
    example: '',
    description: '文章id，传入更新，不传新增',
  })
  article_id: string;

  @ApiProperty({
    example: '676159a0fbc3',
    description: '用户id',
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  user_id: string;
}
