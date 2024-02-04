import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateShareDto } from './dto/create-share.dto';

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

  async unShare(share_id: number) {
    return await this.prisma.share.delete({
      where: {
        share_id,
      },
    });
  }
}
