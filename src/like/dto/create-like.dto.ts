import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    required: true,
    title: 'post id',
    description: 'like와 관계된 post의 id를 할당 해 주시면 됩니다.',
  })
  post_id: number;
}

export class CreateLikeResponseDto {
  @ApiResponseProperty()
  like_id: number;
}
