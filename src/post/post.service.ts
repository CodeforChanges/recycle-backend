import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import {
  formatPostsWithOwnerAndLike,
  getPostFindManyResult,
} from './utils/post.utils';
import { GetAllPostServiceParams } from './types/post.types';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagService: TagService,
  ) {}

  async create(data: CreatePostDto, user_id: number) {
    const newPost = await this.prisma.post.create({
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
        post_images: {
          createMany: {
            data: data.post_images?.map((item) => {
              return {
                image_link: item,
              };
            }),
          },
        },
      },
    });

    if (data.post_tags != null) {
      // Link tags to a post
      for (let index = 0; index < data.post_tags.length; index++) {
        this.tagService.link(data.post_tags[index], newPost.post_id);
      }
    }

    return newPost;
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
