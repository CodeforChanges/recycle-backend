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

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOne(
    @Body() createOneDto: CreateLikeDto,
    @Req() request: Request,
  ) {
    const user_id = request['user'].user_id;
    return await this.likeService.createOne(createOneDto, user_id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id) {
    return await this.deleteOne(+id);
  }
}
