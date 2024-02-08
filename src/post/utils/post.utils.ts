import { get } from 'http';
import {
  GetPostFindManyParams,
  GetPostFindManyResult,
  PostType,
} from '../types/post.types';

export const getPostFindManyResult = async ({
  page,
  filter,
  prisma,
  target_id,
}: GetPostFindManyParams) => {
  const pageSize = 4;
  return await prisma.post.findMany({
    skip: page * pageSize,
    take: pageSize,
    where: {
      post_owner_id: target_id,
    },
    include: {
      post_comments: {
        select: {
          comment_content: true,
          comment_owner: {
            select: {
              user_id: true,
              user_nickname: true,
              user_image: true,
            },
          },
          comment_id: true,
          reg_date: true,
        },
        orderBy: {
          reg_date: 'desc',
        },
      },
      post_images: {
        orderBy: {
          reg_date: 'desc',
        },
      },
      post_likes: {
        select: {
          like_owner_id: true,
          like_id: true,
        },
      },
      post_owner: {
        select: {
          user_id: true,
          user_nickname: true,
          user_image: true,
        },
      },
    },
    orderBy:
      filter === 'like'
        ? {
            post_likes: {
              _count: 'desc',
            },
          }
        : {
            reg_date: 'desc',
          },
  });
};

const getUserLikeState = ({
  post,
  user_id,
}: {
  post: PostType;
  user_id: number;
}) => {
  return post.post_likes.some((like) => like.like_owner_id === user_id);
};

const getLikesCount = (post: PostType) => {
  return post.post_likes.length;
};

export const formatPostsWithOwnerAndLike = ({
  posts,
  user_id,
}: {
  posts: GetPostFindManyResult;
  user_id: number;
}) => {
  return posts.map((post) => ({
    ...post,
    post_likes: undefined,
    post_shares: undefined,
    likesCount: getLikesCount(post),
    isLiked: getUserLikeState({ post, user_id }),
  }));
};
