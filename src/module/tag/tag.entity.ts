import { BaseEntity } from '@/common/entity/BaseEntity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @Column({ type: 'varchar', comment: '标签名字', length: 20, nullable: false })
  name: string;

  @ManyToMany(() => ArticleEntity, (article) => article.tags)
  articles: ArticleEntity[];
}
