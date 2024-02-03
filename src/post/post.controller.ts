import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostFindManyFilter } from './types/post.types';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary:
      '게시물 1페이지(4개) 데이터 받는 엔드포인트 입니다. page=0부터 시작.',
  })
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('filter') filter: PostFindManyFilter,
  ) {
    return await this.postService.findAll({ page, filter });
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '게시물 생성 엔드포인트 입니다.' })
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: 'id로 한 게시물 데이터 받는 엔드포인트 입니다.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'id로 게시물 업데이트 하는 엔드포인트 입니다.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'id로 게시물 제거하는 엔드포인트 입니다.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
