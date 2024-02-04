import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ title: '댓글 내용.' })
  comment_content: string;

  comment_id: number;
}

export class UpdateCommentResponseDto implements Partial<UpdateCommentDto> {
  @ApiProperty({ title: '댓글 id.' })
  comment_id: number;

  @ApiProperty({ title: '댓글 내용.' })
  comment_content: string;
}
