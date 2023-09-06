import { BaseEntity } from '@/common/entity/BaseEntity';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { ArticleEntity } from '../article/article.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', comment: '用户名', length: 20, nullable: false })
  username: string;

  @Column({ type: 'varchar', comment: '昵称', length: 20, nullable: true })
  nickname: string;

  @Column({
    type: 'varchar',
    comment: '密码',
    nullable: false,
    select: false,
    transformer: {
      to: (value) => hashSync(value),
      from: (value) => value,
    },
  })
  password: string;

  @Column({
    type: 'varchar',
    comment: '邮箱',
    length: 30,
    nullable: false,
  })
  email: string;

  @JoinTable({
    name: 'user_article',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'article_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany((entity) => ArticleEntity, { cascade: true })
  articles: ArticleEntity[];
}
