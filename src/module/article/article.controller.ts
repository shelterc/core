import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleListDto, ArticleSetDto } from './article.dto';
import { ArticleService } from './article.service';
import { UserEntity } from '../user/user.entity';
import { CurrentUser, IsPublic } from '@/common/decorator';

@Controller('/article')
@ApiTags('文章模块')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @ApiOperation({ summary: '新增文章/更新文章' })
  @ApiBearerAuth()
  async set(@Body() params: ArticleSetDto, @CurrentUser() user: UserEntity) {
    return this.articleService.set(params, user);
  }

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  @IsPublic()
  async list(@Query() params: ArticleListDto) {
    return this.articleService.list(params);
  }
}
