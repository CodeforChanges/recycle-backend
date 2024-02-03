import { PrismaService } from 'src/prisma.service';
import { getPostFindManyResult } from '../utils/post.utils';

export type PostFindManyFilter = 'like' | 'date';

export type GetAllPostBaseParams = {
  filter: PostFindManyFilter;
  page: number;
};

export type GetAllPostServiceParams = GetAllPostBaseParams & {
  user_id: number;
};

export type GetPostFindManyArgsParams = GetAllPostBaseParams & {
  pageSize: number;
};

export type GetPostFindManyResult = Awaited<
  ReturnType<typeof getPostFindManyResult>
>;

export type GetPostFindManyParams = GetAllPostBaseParams & {
  prisma: PrismaService;
};
