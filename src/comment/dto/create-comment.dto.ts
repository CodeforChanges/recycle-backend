import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Comment } from '@prisma/client';

export class CreateCommentDto {
  @ApiProperty({
    title: '댓글 내용.',
    required: true,
    description: '댓글 내용을 입력해주세요.',
  })
  comment_content: string;

  @ApiProperty({
    title: '게시글 id.',
    required: true,
    description: '게시글 id를 입력해주세요.',
  })
  post_id: number;

  user_id: number;
}

export class CreateCommentResponseDto implements Comment {
  @ApiResponseProperty()
  comment_id: number;

  @ApiResponseProperty()
  comment_content: string;

  @ApiResponseProperty()
  comment_owner_id: number;

  @ApiResponseProperty()
  comment_post_id: number;

  @ApiResponseProperty()
  reg_date: Date;
}
