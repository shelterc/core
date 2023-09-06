import { Inject, Injectable } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleSetDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntityRepository: Repository<ArticleEntity>,
  ) {}
  /**
   * @author: rain
   * @description: 新增文章或修改文章
   * @param {ArticleSetDto} params
   * @return {*}
   */
  async set(params: ArticleSetDto) {
    const { article_id, tag_ids } = params;
    console.log(params);
    const article = await this.articleEntityRepository.findOne({
      where: {
        id: article_id,
      },
    });
    if (article !== null && article_id) {
      return await this.articleEntityRepository.update(
        { id: article_id },
        params,
      );
    }
    return await this.articleEntityRepository.save(params);
  }
}
