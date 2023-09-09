import { Injectable } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { In, Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleListDto, ArticleSetDto } from './article.dto';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';
import { ErrResult } from '@/common/result/result';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntityRepository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private readonly tagEntityRepository: Repository<TagEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly manager: EntityManager,
  ) {}
  /**
   * @author: rain
   * @description: 新增文章或修改文章
   * @param {ArticleSetDto} params
   * @return {*}
   */
  async set(params: ArticleSetDto, user: UserEntity): Promise<boolean> {
    try {
      const { id, tag_ids } = params;
      if (id !== '') {
        const article = await this.articleEntityRepository.findOne({
          where: { id },
        });
        if (article.id) {
          const tags = await this.tagEntityRepository.find({
            where: {
              id: In(tag_ids),
            },
          });
          await this.articleEntityRepository.save({ ...params, tags });
          return true;
        }
      } else {
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
    } catch (error) {
      throw new ErrResult(500, error.message);
    }
  }

  /**
   * @author: rain
   * @description: 文章分页，可根据标签和作者
   * @return {*}
   */
  async list(
    params: ArticleListDto,
  ): Promise<{ list: ArticleEntity[]; count: number }> {
    try {
      const { page = 1, pageSize = 10, category, user_id } = params;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const list = await this.articleEntityRepository.find({
        where: { user: { id: user_id } },
        relations: ['tags'],
        order: { createdAt: 'DESC' },
        skip,
        take,
        cache: false,
      });

      const count = await this.articleEntityRepository.count({
        where: { user: { id: user_id } },
      });
      return {
        list,
        count,
      };
    } catch (error) {
      throw new ErrResult(500, error.message);
    }
  }
}
