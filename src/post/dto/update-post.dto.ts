import { ApiProperty, ApiResponseProperty, PickType } from '@nestjs/swagger';
import { PostImageDto } from 'src/dto/base.dto';

export class UpdatePostDto {
  @ApiProperty({
    required: false,
    title: '게시물 텍스트 내용',
    description: '게시물 텍스트 내용 입니다!',
  })
  post_content?: string;

  @ApiProperty({
    required: false,
    title: '이미지에 수정후 포스트 이미지 리스트',
    description: '이미지 수정후 포스트 이미지 리스트 담아주시면 됩니다!',
  })
  post_images?: string[];

  @ApiProperty({
    required: false,
    title: '게시글 태그 토글',
    description:
      '배열에 담긴 태그들에 대해서 이미 게시글에 존재하는 태그는 삭제하고 존재하지 않는 태그는 게시글에 추가합니다.',
  })
  post_tags?: string[];
}

class UpdatePostImageDto implements Partial<PostImageDto> {
  @ApiResponseProperty()
  image_id: number;

  @ApiResponseProperty()
  image_link: string;
}

export class UpdatePostResponseDto {
  @ApiResponseProperty()
  post_content: string;

  @ApiResponseProperty({
    type: [UpdatePostImageDto],
  })
  post_images: UpdatePostImageDto[];
}
