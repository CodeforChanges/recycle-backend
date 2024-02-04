import { ApiResponseProperty } from '@nestjs/swagger';

export class DeleteUserResponseDto {
  @ApiResponseProperty()
  user_id: number;
}
