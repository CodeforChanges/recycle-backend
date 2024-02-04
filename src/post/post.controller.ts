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
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostFindManyFilter } from './types/post.types';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '게시물 1페이지(4개) 데이터 받는 엔드포인트 입니다. page=0부터 시작.',
  })
  @Get()
  async findAll(
    @Req() request: Request,
    @Query('page') page: number,
    @Query('filter') filter: PostFindManyFilter,
  ) {
    const user_id = request['user'].user_id;
    return await this.postService.findAll({ page, filter, user_id });
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '게시물 생성 엔드포인트 입니다.' })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user_id = req['user'].user_id;
    return await this.postService.create(createPostDto, +user_id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'post_id로 게시물 업데이트 하는 엔드포인트 입니다.',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'post_id로 게시물 제거하는 엔드포인트 입니다.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
