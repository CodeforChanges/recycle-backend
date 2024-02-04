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
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({
    summary: '유저 좋아요 누를시 호출되는 엔드포인트.',
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
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id) {
    return await this.deleteOne(+id);
  }
}
