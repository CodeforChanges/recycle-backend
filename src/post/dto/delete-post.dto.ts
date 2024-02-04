import { ApiResponseProperty } from '@nestjs/swagger';

export class DeletePostResponseDto {
  @ApiResponseProperty()
  post_id: number;
}
