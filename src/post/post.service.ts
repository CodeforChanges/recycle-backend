import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { getPostFindManyResult } from './utils/post.utils';
import {
  GetAllPostServiceParams,
  PostFindManyFilter,
} from './types/post.types';

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

  async findAll({ page, filter, user_id }: GetAllPostServiceParams) {
    const result = await getPostFindManyResult({
      page,
      filter,
      prisma: this.prisma,
    });
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        post_id: id,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        post_id: id,
      },
      include: { post_images: true },
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
      where: {
        post_id: id,
      },
    });
  }
}
