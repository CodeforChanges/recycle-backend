import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ title: '댓글 내용.' })
  comment_content: string;

  @ApiProperty({ title: '게시글 id.' })
  post_id: number;

  user_id: number;
}
