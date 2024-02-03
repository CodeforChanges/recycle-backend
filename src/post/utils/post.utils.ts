import { Prisma } from '@prisma/client';
import { PostFindManyFilter } from '../types/post.types';

type GetPostFilter = {
  filter: PostFindManyFilter;
  page: number;
  pageSize: number;
};

export const getPostFindManyArgs = ({
  filter,
  page,
  pageSize,
}: GetPostFilter): Prisma.PostFindManyArgs => {
  return {
    skip: page * pageSize,
    take: pageSize,
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

