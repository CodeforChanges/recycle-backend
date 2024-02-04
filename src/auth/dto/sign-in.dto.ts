import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    required: true,
    title: '로그인 이메일',
    description: '로그인 이메일 입니다.',
  })
  user_email: string;

  @ApiProperty({
    required: true,
    title: '로그인 패스워드',
    description: '로그인 패스워드 입니다.',
  })
  user_password: string;
}

export class SignInResponseDto {
  @ApiResponseProperty()
  access_token: string;
}
