import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: '' })
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一id' })
  id: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deleted_at',
    comment: '删除时间',
  })
  deletedAt: Date;
}
