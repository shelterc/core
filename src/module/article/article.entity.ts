import { BaseEntity } from '@/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'article' })
export class ArticleEntity extends BaseEntity {
  @Column({})
  content: string;
}
