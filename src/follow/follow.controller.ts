import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @ApiOperation({
    summary: '유저 팔로우시 호출되는 엔드포인트.',
    description: '파라미터 id는 상대방 user_id 입니다.',
  })
  @UseGuards(AuthGuard)
  @Post()
  async follow(@Body() createFollowDto: CreateFollowDto, @Req() req: Request) {
    const follower_id = +req['user'].user_id;
    createFollowDto.follower_id = follower_id;
    return await this.followService.follow(createFollowDto);
  }

  @ApiOperation({
    summary: '유저 언팔로우시 호출되는 엔드포인트.',
    description: '파라미터 id는 follow 객체의 follow_id 입니다.',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async unFollow(@Param('id') id: string) {
    return await this.followService.unFollow(+id);
  }
}
