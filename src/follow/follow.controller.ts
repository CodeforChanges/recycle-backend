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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  CreateFollowDto,
  CreateFollowResponseDto,
} from './dto/create-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @ApiOperation({
    summary: '유저 팔로우시 호출되는 엔드포인트.',
    description: 'following_id 는 상대 user_id 입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '팔로우 생성 성공',
    type: CreateFollowResponseDto,
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
    description: '상대방 user_id를 파라미터로 보내주세요.',
  })
  @ApiResponse({
    status: 200,
    description: '언팔로우 성공',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '상대방 user',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async unFollow(@Param('id') following_id: string, @Req() req: Request) {
    const follower_id = req['user'].user_id;

    return await this.followService.unFollow({
      follower_id: +follower_id,
      following_id: +following_id,
    });
  }
}
