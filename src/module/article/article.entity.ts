import { BaseEntity } from '@/common/entity/BaseEntity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';

@Entity({ name: 'article' })
export class ArticleEntity extends BaseEntity {
  @Column({ length: 30, comment: '文章标题' })
  title: string;

  @Column({ length: 30, comment: '文章描述' })
  description: string;

  @Column({ type: 'text', comment: '文章内容' })
  content: string;

  @Column({ comment: '文章封面', nullable: true })
  cover_img: string;

  @JoinTable({
    name: 'article_tag',
    joinColumn: {
      name: 'article_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany((entity) => TagEntity, (tag) => tag.id)
  tags: TagEntity[];
}
