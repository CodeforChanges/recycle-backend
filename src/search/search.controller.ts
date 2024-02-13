import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '검색 엔드포인트 입니다.' })
  @ApiResponse({
    status: 200,
    description: '검색한 게시물 받기 성공',
  })
  @Post()
  async searchByContent(@Body() {keyword}: {keyword: string}, @Req() req: Request) {
    const user_id = req['user'].user_id;
    if(keyword.substring(0, 1) == '#'){
      return await this.searchService.searchByHashtag(keyword, +user_id);    
    }
    else{
      return await this.searchService.searchByContent(keyword, +user_id);
    }
  }
}
