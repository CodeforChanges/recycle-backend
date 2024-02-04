import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ title: '댓글 내용.' })
  comment_content: string;

  @ApiProperty({ title: '댓글 id.' })
  comment_id: number;
}
