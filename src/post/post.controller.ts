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
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import { UpdatePostDto, UpdatePostResponseDto } from './dto/update-post.dto';
import { PostFindManyFilter } from './types/post.types';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { FindManyPostResponseDto } from './dto/findMany-post.dto';
import { DeletePostResponseDto } from './dto/delete-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '게시물 1페이지(4개) 데이터 받는 엔드포인트 입니다. page=0부터 시작.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'page=0부터 시작',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'filter=date, like',
  })
  @ApiQuery({
    name: 'owner',
    required: false,
    description: 'owner=유저 user_id',
  })
  @ApiResponse({
    status: 200,
    description: '게시물 1페이지(4개) 데이터 받기 성공',
    type: [FindManyPostResponseDto],
  })
  @Get()
  async findAll(
    @Req() request: Request,
    @Query('page') page: string | undefined,
    @Query('filter') filter: PostFindManyFilter,
    @Query('owner') target_id: string | undefined,
  ) {
    const user_id = request['user'].user_id;
    return await this.postService.findAll({
      page: page ? +page : 0,
      filter,
      user_id,
      target_id: target_id ? +target_id : undefined,
    });
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '게시물 생성 엔드포인트 입니다.' })
  @ApiResponse({
    status: 201,
    description: '게시물 생성 성공',
    type: CreatePostResponseDto,
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user_id = req['user'].user_id;
    return await this.postService.create(createPostDto, +user_id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'post_id로 게시물 업데이트 하는 엔드포인트 입니다.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'post_id를 보내주세요.',
  })
  @ApiResponse({
    status: 200,
    description: '게시물 업데이트 성공',
    type: UpdatePostResponseDto,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'post_id로 게시물 제거하는 엔드포인트 입니다.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'post_id를 보내주세요.',
  })
  @ApiResponse({
    status: 200,
    description: '게시물 제거 성공',
    type: DeletePostResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
