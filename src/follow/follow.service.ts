import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FollowServiceArgs } from './types/follow.types';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async follow({ follower_id, following_id }: FollowServiceArgs) {
    return await this.prisma.follow.create({
      data: {
        follower: {
          connect: {
            user_id: follower_id,
          },
        },
        following: {
          connect: {
            user_id: following_id,
          },
        },
      },
    });
  }

  async unFollow(follow_id: number) {
    return await this.prisma.follow.delete({
      where: {
        follow_id,
      },
    });
  }
}
