import { PrismaService } from 'src/prisma.service';
import { getPostFindManyResult } from '../utils/post.utils';

export type PostFindManyFilter = 'like' | 'date' | undefined;

export type GetAllPostBaseParams = {
  filter: PostFindManyFilter;
  page: number;
};

export type GetAllPostServiceParams = GetAllPostBaseParams & {
  user_id: number;
  target_id: number | undefined;
};

export type GetPostFindManyResult = Awaited<
  ReturnType<typeof getPostFindManyResult>
>;

export type GetPostFindManyParams = GetAllPostBaseParams & {
  prisma: PrismaService;
  target_id?: number;
};

export type PostType = ReturnType<typeof getPostFindManyResult> extends Promise<
  (infer U)[]
>
  ? U
  : never;
