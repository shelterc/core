import { Inject, Injectable } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleEntity)
    private readonly articleEntityRepository: Repository<ArticleEntity>,
  ) {}
}
