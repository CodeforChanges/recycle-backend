import {
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
import { CreateCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(createCommentDto: CreateCommentDto, @Req() req: Request) {
    const user_id = req['user'].user_id;
    createCommentDto.user_id = +user_id;
    return await this.commentService.create(createCommentDto);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(updateCommentDto: UpdateCommentDto) {
    return await this.commentService.update(updateCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') comment_id: string) {
    return await this.commentService.delete(+comment_id);
  }
}
