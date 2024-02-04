import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, CreateLikeResponseDto } from './dto/create-like.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({
    summary: '유저 좋아요 누를시 호출되는 엔드포인트.',
  })
  @ApiResponse({
    status: 201,
    description: '좋아요 생성 성공',
    type: CreateLikeResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  async createOne(
    @Body() createOneDto: CreateLikeDto,
    @Req() request: Request,
  ) {
    const user_id = request['user'].user_id;
    return await this.likeService.createOne(createOneDto, user_id);
  }

  @ApiOperation({
    summary: '유저 좋아요 취소시 호출되는 엔드포인트.',
    description: 'delete의 id 파라미터는 like 객체의 like_id 입니다.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'post_id를 보내주세요.',
  })
  @ApiResponse({
    status: 200,
    description: '좋아요 취소 성공',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') post_id: string, @Req() request: Request) {
    const user_id = request['user'].user_id;
    return await this.likeService.deleteOne({
      post_id: +post_id,
      user_id: +user_id,
    });
  }
}
