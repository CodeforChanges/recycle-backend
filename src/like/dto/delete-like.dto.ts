import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class DeleteLikeDto {
  @ApiProperty()
  post_id: number;

  user_id: number;
}
