import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserDto } from 'src/dto/base.dto';

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

export class UpdateUserResponseDto implements Partial<UserDto> {
  @ApiResponseProperty()
  user_nickname: string;

  @ApiResponseProperty()
  user_image: string;
}
