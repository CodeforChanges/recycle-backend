import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShareService } from './share.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateShareDto } from './dto/create-share.dto';
import { Request } from 'express';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @ApiOperation({
    summary: '포스트 공유시 호출되는 엔드포인트 입니다.',
  })
  @UseGuards(AuthGuard)
  @Post()
  async share(@Body() createShareDto: CreateShareDto, @Req() req: Request) {
    const user_id = req['user'].user_id;
    createShareDto.user_id = user_id;
    return await this.shareService.share(createShareDto);
  }

  @ApiOperation({
    summary: '포스트 공유 해제시 호출되는 엔드포인트 입니다.',
    description: 'id는 share객체의 share_id 입니다.',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async unShare(@Param('id') id: string) {
    return await this.shareService.unShare(+id);
  }
}
