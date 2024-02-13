import { ApiResponseProperty } from '@nestjs/swagger';
import {
  Comment,
  Like,
  Post,
  Post_Image,
  User,
} from '@prisma/client';

export class PostDto implements Post {
  @ApiResponseProperty()
  post_id: number;

  @ApiResponseProperty()
  post_content: string;

  @ApiResponseProperty()
  post_owner_id: number;

  @ApiResponseProperty()
  reg_date: Date;
}

export class UserDto implements User {
  @ApiResponseProperty()
  user_id: number;

  @ApiResponseProperty()
  user_email: string;

  @ApiResponseProperty()
  user_password: string;

  @ApiResponseProperty()
  user_name: string;

  @ApiResponseProperty()
  user_nickname: string;

  @ApiResponseProperty()
  user_image: string;

  @ApiResponseProperty()
  user_created_at: Date;
}

export class CommentDto implements Comment {
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

export class LikeDto implements Like {
  @ApiResponseProperty()
  like_id: number;

  @ApiResponseProperty()
  like_owner_id: number;

  @ApiResponseProperty()
  like_post_id: number;

  @ApiResponseProperty()
  reg_date: Date;
}

export class PostImageDto implements Post_Image {
  @ApiResponseProperty()
  image_id: number;

  @ApiResponseProperty()
  image_post_id: number;

  @ApiResponseProperty()
  image_link: string;

  @ApiResponseProperty()
  reg_date: Date;
}
