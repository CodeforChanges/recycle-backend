import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    if(!createCommentDto.post_id){
      throw new NotFoundException("존재하지 않는 게시물입니다.")
    }
    return await this.prisma.comment.create({
      include:{
        comment_owner:{
          select:{
            user_id: true,
            user_nickname: true,
            user_image: true
          }
        }
      },
      data: {
        comment_content: createCommentDto.comment_content,
        comment_post: {
          connect: {
            post_id: createCommentDto.post_id,
          },
        },
        comment_owner: {
          connect: {
            user_id: createCommentDto.user_id,
          },
        },
      },
    });
  }

  async update(updateCommentDto: UpdateCommentDto) {
    console.log(updateCommentDto);
    return await this.prisma.comment.update({
      where: {
        comment_id: updateCommentDto.comment_id,
      },
      data: {
        comment_content: updateCommentDto.comment_content,
      },
    });
  }

  async delete(comment_id: number) {
    return await this.prisma.comment.delete({
      where: {
        comment_id,
      },
    });
  }
}
