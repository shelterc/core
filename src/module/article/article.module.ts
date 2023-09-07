import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, TagEntity, UserEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
