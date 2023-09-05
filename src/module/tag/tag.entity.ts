import { BaseEntity } from '@/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @Column({ type: 'varchar', comment: '标签名字', length: 20, nullable: false })
  name: string;
}
