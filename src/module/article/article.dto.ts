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
    example: ['218fde89-6acc-4abe-a4cc-7b17c0715ed3'],
    description: '关联标签',
  })
  tag_ids: string[];

  @ApiProperty({
    example: '',
    description: '文章id，传入更新，不传新增',
  })
  id: string;
}

export class ArticleListDto {
  @ApiProperty({ example: '1', description: '页数', required: false })
  page: string;

  @ApiProperty({ example: '10', description: '条数', required: false })
  pageSize: string;

  @ApiProperty({
    example: ['218fde89-6acc-4abe-a4cc-7b17c0715ed3'],
    description: '标签',
    required: false,
  })
  category: string[];

  @ApiProperty({
    example: 'a75f6b0e-f9e4-4876-bafa-c52b127c4704',
    description: '用户',
    required: false,
  })
  user_id: string;
}
