import { BaseEntity } from 'src/common/entity/BaseEntity';
import { Entity, Column } from 'typeorm';

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
      to: (value) => {
        return value ? value + '111' : value;
      },
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
}
