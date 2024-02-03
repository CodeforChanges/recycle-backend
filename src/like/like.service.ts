import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async createOne({ post_id }: CreateLikeDto, user_id: number) {
    const existingLike = await this.prisma.like.findFirst({
      where: {
        like_owner_id: user_id,
        AND: {
          like_post_id: post_id,
        },
      },
    });

    if (existingLike) {
      throw new BadRequestException('이미 좋아요를 누른 게시판입니다.');
    }

    return await this.prisma.like.create({
      data: {
        like_owner: {
          connect: {
            user_id,
          },
        },
        like_post: {
          connect: {
            post_id,
          },
        },
      },
    });
  }

  async deleteOne(like_id: number) {
    return await this.prisma.like.delete({
      where: {
        like_id,
      },
    });
  }
}
