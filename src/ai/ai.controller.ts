import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GarbageClassificationRequestDto } from './dto/garbage-classification-request.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { ModelRequestResponse } from './dto/model-request-response.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '쓰레기 종류 분류 모델 추론 요청',
  })
  @ApiResponse({
    status: 200,
    description: '추론 요청 ID 반환',
    type: ModelRequestResponse,
  })
  @Post('garbage')
  async garbageClassificationRequest(
    @Body() dto: GarbageClassificationRequestDto,
  ) {
    return await this.aiService.garbageClassificationRequest(dto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '쓰레기 종류 분류 모델 결과 확인',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '모델 추론 ID',
  })
  @ApiResponse({
    status: 200,
    description: '추론 결환 반환',
  })
  @Get('garbage/:id')
  async getGarbageClassificationResult(@Param('id') id: string) {
    const result = await this.aiService.getGarbageClassificationResult(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
