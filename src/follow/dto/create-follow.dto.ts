import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({ title: '상대방 유저 id.' })
  following_id: number;

  follower_id: number;
}
