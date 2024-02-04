import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateShareDto } from './dto/create-share.dto';
import { DeleteShareDto } from './dto/delete-share.dto';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  async share({ user_id, post_id }: CreateShareDto) {
    const existingShare = await this.prisma.share.findFirst({
      where: {
        share_owner_id: user_id,
        share_post_id: post_id,
      },
    });

    if (existingShare) {
      throw new BadRequestException('이미 공유한 게시물입니다.');
    }

    return await this.prisma.share.create({
      select: {
        share_owner_id: true,
        share_post_id: true,
      },
      data: {
        share_owner: {
          connect: {
            user_id,
          },
        },
        share_post: {
          connect: {
            post_id,
          },
        },
      },
    });
  }

  async unShare({ post_id, user_id }: DeleteShareDto) {
    return await this.prisma.share.deleteMany({
      where: {
        share_owner_id: user_id,
        AND: {
          share_post_id: post_id,
        },
      },
    });
  }
}
