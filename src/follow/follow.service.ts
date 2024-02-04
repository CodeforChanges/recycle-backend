import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { DeleteFollowDto } from './dto/delete-follow.dto';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async follow({ follower_id, following_id }: CreateFollowDto) {
    const existingFollow = await this.prisma.follow.findFirst({
      where: {
        follower_id,
        AND: {
          following_id,
        },
      },
    });

    if (existingFollow) {
      throw new BadRequestException('이미 팔로우한 계정입니다.');
    }

    return await this.prisma.follow.create({
      select: {
        follower_id: true,
        following_id: true,
      },
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

  async unFollow({ follower_id, following_id }: DeleteFollowDto) {
    return await this.prisma.follow.deleteMany({
      where: {
        follower_id,
        AND: {
          following_id,
        },
      },
    });
  }
}
