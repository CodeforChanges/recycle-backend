import { ApiResponseProperty } from '@nestjs/swagger';
import { UserDto } from 'src/dto/base.dto';

export class FindOneUserResponseDto implements Partial<UserDto> {
  @ApiResponseProperty()
  user_id: number;

  @ApiResponseProperty()
  user_email?: string;

  @ApiResponseProperty()
  user_image?: string;

  @ApiResponseProperty()
  user_name?: string;

  @ApiResponseProperty()
  user_nickname?: string;

  @ApiResponseProperty()
  user_created_at?: Date;
}
