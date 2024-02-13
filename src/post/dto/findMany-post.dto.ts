import { ApiResponseProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { CommentDto, LikeDto, PostImageDto, UserDto } from 'src/dto/base.dto';

class CommentUserDto implements Partial<UserDto> {
  @ApiResponseProperty()
  user_id: number;

  @ApiResponseProperty()
  user_nickname: string;

  @ApiResponseProperty()
  user_image: string;
}

class PostCommentDto implements Partial<CommentDto> {
  @ApiResponseProperty()
  comment_content?: string;

  @ApiResponseProperty({ type: CommentUserDto })
  comment_owner: CommentUserDto;

  @ApiResponseProperty()
  comment_id: number;

  @ApiResponseProperty()
  reg_date: Date;
}

class PostLikeDto implements Partial<LikeDto> {
  @ApiResponseProperty()
  like_id: number;

  @ApiResponseProperty()
  like_owner_id?: number;
}

class PostOwnerDto implements Partial<UserDto> {
  @ApiResponseProperty()
  user_id: number;

  @ApiResponseProperty()
  user_nickname: string;

  @ApiResponseProperty()
  user_image: string;

  @ApiResponseProperty()
  follower_count: number;
}

export class FindManyPostResponseDto implements Partial<Post> {
  @ApiResponseProperty()
  post_id: number;

  @ApiResponseProperty()
  post_content?: string;

  @ApiResponseProperty()
  post_owner_id: number;

  @ApiResponseProperty()
  reg_date?: Date;

  @ApiResponseProperty({ type: [PostCommentDto] })
  post_comments: PostCommentDto[];

  @ApiResponseProperty({ type: [PostImageDto] })
  post_images: PostImageDto[];

  @ApiResponseProperty({ type: PostOwnerDto })
  post_owner: PostOwnerDto;

  @ApiResponseProperty()
  likesCount: number;

  @ApiResponseProperty()
  isLiked: boolean;
}
