import { Prisma } from '@prisma/client';
import {
  GetPostFindManyArgsParams,
  GetPostFindManyParams,
  GetPostFindManyResult,
} from '../types/post.types';

const getPostFindManyArgs = ({
  filter,
  page,
  pageSize,
}: GetPostFindManyArgsParams): Prisma.PostFindManyArgs => {
  return {
    skip: page * pageSize,
    take: pageSize,
    include: {
      post_comments: {
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
        include: {
          like_owner: true,
        },
      },
      post_owner: {},
      post_shares: {
        include: {
          share_owner: true,
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
  };
};

export const getPostFindManyResult = async ({
  page,
  filter,
  prisma,
}: GetPostFindManyParams) => {
  const pageSize = 4;
  return await prisma.post.findMany(
    getPostFindManyArgs({
      filter,
      page,
      pageSize,
    }),
  );
};

const getUserLikeState = () => {
  // TODO: like 상태 확인하는 로직 작성.
};

export const formatPostsWithOwnerAndLike = (posts: GetPostFindManyResult) => {
  // TODO: typescript 오류 해결.
  return posts.map((post) => ({
    ...post,
  }));
};
