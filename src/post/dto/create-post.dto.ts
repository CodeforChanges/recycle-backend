import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    required: true,
    title: '게시물 텍스트 내용',
    description: '게시물 텍스트 내용 보내주시면 됩니다.',
  })
  post_content: string;

  @ApiProperty({
    required: false,
    title: '게시글에 사용된 이미지 배열',
    description:
      '게시물 포스트 할 때 업로드한 이미지 배열을 여기에 담아주시면 됩니다.',
  })
  post_images?: string[];
}
