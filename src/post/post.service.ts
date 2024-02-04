import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import {
  formatPostsWithOwnerAndLike,
  getPostFindManyResult,
} from './utils/post.utils';
import { GetAllPostServiceParams } from './types/post.types';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto, user_id: number) {
    return await this.prisma.post.create({
      include: {
        post_images: true,
        post_owner: {
          select: {
            user_id: true,
            user_nickname: true,
            user_image: true,
          },
        },
      },
      data: {
        post_content: data.post_content,
        post_owner: {
          connect: {
            user_id,
          },
        },
      },
    });
  }

  async findAll({ page, filter, user_id, target_id }: GetAllPostServiceParams) {
    const result = await getPostFindManyResult({
      page,
      filter,
      prisma: this.prisma,
      target_id,
    });

    return formatPostsWithOwnerAndLike({ posts: result, user_id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        post_id: id,
      },
      select: {
        post_content: true,
        post_images: {
          select: {
            image_id: true,
            image_link: true,
          },
          orderBy: {
            reg_date: 'desc',
          },
        },
      },
      data: {
        post_content: updatePostDto.post_content,
        post_images: {
          deleteMany: {
            image_post_id: id,
          },
          createMany: {
            data: updatePostDto.post_images?.map((item) => {
              return {
                image_link: item,
              };
            }),
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.post.delete({
      select: {
        post_id: true,
      },
      where: {
        post_id: id,
      },
    });
  }
}
