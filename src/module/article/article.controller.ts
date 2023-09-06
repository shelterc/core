import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleSetDto } from './article.dto';
import { ArticleService } from './article.service';

@Controller('/article')
@ApiTags('文章模块')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @ApiOperation({ summary: '新增文章/更新文章' })
  async set(@Body() params: ArticleSetDto) {
    return this.articleService.set(params);
  }
}
