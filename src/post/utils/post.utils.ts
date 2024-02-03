import {
  GetPostFindManyParams,
  GetPostFindManyResult,
  PostType,
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

const getUserLikeState = ({
  post,
  user_id,
}: {
  post: PostType;
  user_id: number;
}) => {
  return post.post_likes.some((like) => like.like_owner_id === user_id);
};

const getUserShareState = ({
  post,
  user_id,
}: {
  post: PostType;
  user_id: number;
}) => {
  return post.post_shares.some((share) => share.share_owner_id === user_id);
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
    isLiked: getUserLikeState({ post, user_id }),
    isShared: getUserShareState({ post, user_id }),
  }));
};
