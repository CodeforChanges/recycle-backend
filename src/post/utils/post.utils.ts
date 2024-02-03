import {
  GetPostFindManyParams,
  GetPostFindManyResult,
} from '../types/post.types';

export const getPostFindManyResult = async ({
  page,
  filter,
  prisma,
}: GetPostFindManyParams) => {
  const pageSize = 4;
  return await prisma.post.findMany({
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
  });
};

const getUserLikeState = () => {
  // TODO: like 상태 확인하는 로직 작성.
};

export const formatPostsWithOwnerAndLike = (posts: GetPostFindManyResult) => {
  return posts.map((post) => ({
    ...post,
  }));
};
