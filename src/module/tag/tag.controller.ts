import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagListDto, TagSetDto } from './tag.dto';
import { TagService } from './tag.service';
import { IsPublic } from '@/common/decorator';

@Controller('/tag')
@ApiTags('标签模块')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post()
  @ApiOperation({ summary: '新增标签/更新标签' })
  async create(@Body() params: TagSetDto) {
    return this.tagService.set(params);
  }

  @Get()
  @ApiOperation({ summary: '标签列表' })
  @IsPublic()
  async list(@Query() params: TagListDto) {
    return this.tagService.list(params);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除标签' })
  async delete(@Param('id') id: string) {
    this.tagService.delete(id);
  }
}
