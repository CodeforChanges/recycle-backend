import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    title: '유저 닉네임',
    description: '유저 닉네임 입니다.',
  })
  user_nickname?: string;

  @ApiProperty({
    required: false,
    title: '유저 이미지',
    description: '유저 프로필 이미지 입니다.',
  })
  user_image?: string;
}
