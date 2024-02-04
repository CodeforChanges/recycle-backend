import { ApiProperty, ApiResponseProperty, PickType } from '@nestjs/swagger';
import { Post, Post_Image, User } from '@prisma/client';
import { PostDto, PostImageDto, UserDto } from 'src/dto/base.dto';

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

export class CreatePostResponseDto implements Partial<PostDto> {
  @ApiResponseProperty()
  post_id: number;

  @ApiResponseProperty()
  post_content: string;

  @ApiResponseProperty()
  post_owner_id: number;

  @ApiResponseProperty()
  reg_date: Date;

  @ApiResponseProperty({
    type: [PostImageDto],
  })
  post_images: PostImageDto[];

  @ApiResponseProperty({
    type: PickType(UserDto, ['user_id', 'user_email', 'user_nickname']),
  })
  post_owner: Pick<User, 'user_id' | 'user_email' | 'user_nickname'>;
}
