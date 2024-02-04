import { ApiProperty } from '@nestjs/swagger';

export class CreateShareDto {
  @ApiProperty({ title: '공유하려는 post의 id' })
  post_id: number;

  user_id: number;
}
