import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { getPostFindManyArgs } from './utils/post.utils';
import { isTruthy } from 'src/utils/global.utils';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        post_content: data.post_content,
        post_owner: {
          connect: {
            user_id: data.post_owner_id,
          },
        },
      },
    });
  }

  async findAll({ page, filter }: { page: number; filter: 'like' | 'date' }) {
    const pageSize = 4;
    return await this.prisma.post.findMany(
      getPostFindManyArgs({
        filter,
        page,
        pageSize,
      }),
    );
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        post_id: id,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // TODO: 값에 따라 저장 하는 방식 정하는 로직 작성
    return await this.prisma.post.update({
      where: {
        post_id: id,
      },
      data: {
        post_content: isTruthy(updatePostDto) ? '' : '',
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
