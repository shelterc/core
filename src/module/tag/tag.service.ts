import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { TagSetDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagEntityRepository: Repository<TagEntity>,
  ) {}

  /**
   * @author: rain
   * @description: 创建标签/设置标签
   * @param {TagSetDto} params
   * @return {*}
   */
  async set(params: TagSetDto): Promise<any> {
    const { name } = params;
    const tag = await this.tagEntityRepository.findOne({
      where: { name },
    });
    if (tag !== null && tag.id) {
      return await this.tagEntityRepository.update({ id: tag.id }, { name });
    }
    return await this.tagEntityRepository.save({ name });
  }

  /**
   * @author: rain
   * @description: 获取标签列表
   * @param {*} params
   * @return {*}
   */
  async list(params): Promise<{ list: TagEntity[]; count: number }> {
    const { page = 1, pageSize = 10 } = params;
    const list = await this.tagEntityRepository.find({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      cache: false,
    });
    const count = await this.tagEntityRepository.count();
    return {
      list,
      count,
    };
  }

  /**
   * @author: rain
   * @description: 删除标签
   * @param {string} id
   * @return {*}
   */
  async delete(id: string): Promise<any> {
    
  }
}
