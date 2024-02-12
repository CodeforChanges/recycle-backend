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
        post_tags: true,
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
      const tags = data.post_tags;

      // Link tags to a post
      for (let index = 0; index < tags.length; index++) {
        const tagName = tags[index];

        await this.tagService.link(tagName, newPost.post_id);

        // NOTE: 게시글의 ID는 게시글 생성 이후 DB에 의해 할당되고 Tag는 외래키에
        //       의해 등록 가능하므로 게시글을 먼저 생성하고 이후 함수 반환값에
        //       태그에 관한 값을 추가하는 순서로 동작한다.
        newPost.post_tags.push({
          tag_name: tagName,
          post_id: newPost.post_id,
        });
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
