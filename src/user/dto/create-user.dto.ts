import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserDto } from 'src/dto/base.dto';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    title: '유저 이메일',
    description: '유저 이메일 입니다.',
  })
  user_email: string;

  @ApiProperty({
    required: true,
    title: '유저 패스워드',
    description: '유저 패스워드 입니다.',
  })
  user_password: string;

  @ApiProperty({
    required: true,
    title: '유저 이름',
    description: '유저 이름 입니다.',
  })
  user_name: string;

  @ApiProperty({
    required: true,
    title: '유저 닉네임',
    description: '유저 닉네임 입니다.',
  })
  user_nickname: string;

  @ApiProperty({
    required: false,
    title: '유저 이미지',
    description: '유저 프로필 이미지 입니다.',
  })
  user_image?: string;
}

export class CreateUserResponseDto implements Partial<UserDto> {
  @ApiResponseProperty()
  user_id: number;

  @ApiResponseProperty()
  user_email?: string;

  @ApiResponseProperty()
  user_name: string;

  @ApiResponseProperty()
  user_nickname?: string;
}
