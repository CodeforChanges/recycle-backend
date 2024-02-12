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
          user_followers: {
            select: {
              follower_id: true,
              follow_id: true,
            },
          },
        },
      },
      post_shares: {
        select: {
          share_id: true,
          share_owner_id: true,
        },
      },
      post_tags: true,
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

const getUserFollowState = ({
  post,
  user_id,
}: {
  post: PostType;
  user_id: number;
}) => {
  return post.post_owner.user_followers.some(
    (follower) => follower.follower_id === user_id,
  );
};

const formatPostOwnerWithFollowCount = (post: PostType) => {
  const { user_followers, ...rest } = post.post_owner;
  return {
    ...rest,
    follower_count: user_followers.length,
  };
};

const getLikesCount = (post: PostType) => {
  return post.post_likes.length;
};

const getSharesCount = (post: PostType) => {
  return post.post_shares.length;
};

const getTagsCount = (post: PostType) => {
  return post.post_tags.length;
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
    sharesCount: getSharesCount(post),
    tagsCount: getTagsCount(post),
    isLiked: getUserLikeState({ post, user_id }),
    isShared: getUserShareState({ post, user_id }),
    isFollowed: getUserFollowState({ post, user_id }),
    post_owner: formatPostOwnerWithFollowCount(post),
  }));
};
