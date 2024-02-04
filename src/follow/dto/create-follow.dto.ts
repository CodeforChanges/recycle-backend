import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({ title: '상대방 유저 id.' })
  following_id: number;

  follower_id: number;
}

export class CreateFollowResponseDto {
  @ApiResponseProperty()
  follow_id: number;

  @ApiResponseProperty()
  following_id: number;
}
