import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleSetDto } from './article.dto';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/user.entity';
import { CurrentUser } from '@/common/decorator';
import { IsAuth } from '@/common/decorator';

@Controller('/article')
@ApiTags('文章模块')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @ApiOperation({ summary: '新增文章/更新文章' })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  async set(@Body() params: ArticleSetDto, @CurrentUser() user: UserEntity) {
    return this.articleService.set(params, user);
  }
}
