import { Injectable } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleSetDto } from './article.dto';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntityRepository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private readonly tagEntityRepository: Repository<TagEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}
  /**
   * @author: rain
   * @description: 新增文章或修改文章
   * @param {ArticleSetDto} params
   * @return {*}
   */
  async set(params: ArticleSetDto, user: UserEntity): Promise<boolean> {
    const { article_id, tag_ids } = params;

    try {
      await this.articleEntityRepository.findOneOrFail({
        where: { id: article_id },
      });
      await this.articleEntityRepository.update({ id: article_id }, params);
      return true;
    } catch (error) {
      const article = new ArticleEntity();
      article.content = params.content;
      article.cover_img = params.cover_img;
      article.title = params.title;
      article.description = params.description;
      if (tag_ids.length > 0) {
        const tags = await this.tagEntityRepository.find({
          where: {
            id: In(tag_ids),
          },
        });
        article.tags = tags;
      }
      article.user = user;
      await this.articleEntityRepository.save(article);
      return true;
    }
  }
}
