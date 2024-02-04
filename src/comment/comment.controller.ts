import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateCommentDto,
  CreateCommentResponseDto,
} from './dto/create-comment.dto';
import { Request } from 'express';
import {
  UpdateCommentDto,
  UpdateCommentResponseDto,
} from './dto/update-comment.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '댓글 생성 엔드포인트 입니다.' })
  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    type: CreateCommentResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const user_id = req['user'].user_id;
    createCommentDto.user_id = +user_id;
    return await this.commentService.create(createCommentDto);
  }

  @ApiOperation({
    summary: 'comment_id로 댓글 업데이트 하는 엔드포인트 입니다.',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 업데이트 성공',
    type: UpdateCommentResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'comment_id를 보내주세요.',
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') comment_id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    updateCommentDto.comment_id = +comment_id;
    return await this.commentService.update(updateCommentDto);
  }

  @ApiOperation({ summary: 'comment_id로 댓글 제거하는 엔드포인트 입니다.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'comment_id를 보내주세요.',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 삭제 성공',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') comment_id: string) {
    return await this.commentService.delete(+comment_id);
  }
}
