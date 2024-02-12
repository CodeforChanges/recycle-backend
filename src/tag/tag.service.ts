import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 게시물에 태그 추가
   *
   * @param tagName - 추가할 태그 이름
   * @param postId - 태그를 추가할 게시글 ID
   * @returns DB에 post-tag 관계 추가 작업한 결과
   */
  async link(tagName: string, postId: number) {
    if (await this.isExists(tagName, postId)) {
      // 이미 게시글에 태그가 있는 경우
      throw new Error('The tag is already attached to the post');
    }

    // Get a post by id
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { post_id: postId },
    });

    // Get a tag by name
    let tag = await this.prisma.tag.findUnique({
      where: { tag_name: tagName },
    });

    if (tag == null) {
      // Create a new tag
      tag = await this.create(tagName);
    }

    // Append the tag to post
    const result = await this.prisma.post_Tag.create({
      data: {
        tag_name: tag.tag_name,
        post_id: post.post_id,
      },
    });

    // Count the tag
    await this.prisma.tag.update({
      where: { tag_name: tag.tag_name },
      data: { count: tag.count + 1 },
    });

    return result;
  }

  /**
   * 게시물에 태그 삭제
   *
   * @param tagName - 삭제할 태그 이름
   * @param postId - 태그를 삭제할 게시글 ID
   * @returns post-tag 관계 삭제에 대한 DB작업 결과
   */
  async unlink(tagName: string, postId: number) {
    if (!(await this.isExists(tagName, postId))) {
      // 게시글에 해당 태그가 존재하지 않는 경우
      throw new Error('That tag does not exist in the post');
    }

    // Get a post by id
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { post_id: postId },
    });

    // Get a tag by name
    const tag = await this.prisma.tag.findUniqueOrThrow({
      where: { tag_name: tagName },
    });

    // Delete post-tag relations
    const result = await this.prisma.post_Tag.delete({
      where: {
        tag_name_post_id: {
          tag_name: tag.tag_name,
          post_id: post.post_id,
        },
      },
    });

    if (tag.count <= 1) {
      // 만약 tag를 참조하는 게시글이 0이라면 해당 태그는 DB에서 삭제
      await this.prisma.tag.delete({
        where: { tag_name: tag.tag_name },
      });
    } else {
      // Count the tag
      await this.prisma.tag.update({
        where: { tag_name: tag.tag_name },
        data: { count: tag.count - 1 },
      });
    }

    return result;
  }

  /**
   * 게시글에 포함된 모든 태그에 대한 관계 제거
   *
   * @param postId - 게시글 ID
   */
  async unlinkAll(postId: number) {
    await this.prisma.post_Tag.deleteMany({
      where: {
        post_id: postId,
      },
    });
  }

  /**
   * 모든 태그 반환
   *
   * @returns 모든 태그 반환
   */
  findAll() {
    return this.prisma.post_Tag.findMany();
  }

  /**
   * 태그 이름으로 태그 검색
   *
   * @param query - 검색어
   * @returns 태그 검색 결과 반환
   */
  findByTag(query: string) {
    return this.prisma.tag.findMany({
      where: {
        tag_name: {
          contains: query,
        },
      },
    });
  }

  /**
   * 게시글에 포함된 태그 검색
   *
   * @param postId - 게시글 ID
   * @returns 태그 검색 결과 반환
   */
  findByPostId(postId: number) {
    return this.prisma.post_Tag.findMany({
      where: {
        post_id: postId,
      },
    });
  }

  /**
   * 게시글에 태그가 존재하는지 확인
   *
   * @param tagName - 태그 이름
   * @param postId - 게시글 ID
   * @returns 게시글의 태그가 존재하는 경우 true, 아닌경우 false 반환
   */
  async isExists(tagName: string, postId: number) {
    const postTag = await this.prisma.post_Tag.findUnique({
      where: {
        tag_name_post_id: {
          tag_name: tagName,
          post_id: postId,
        },
      },
    });

    return postTag != null;
  }

  /**
   * 새로운 태그 생성
   *
   * @param tagName - 태그 이름
   * @returns 태그 생성 DB작업 결과 반환
   */
  private create(tagName: string) {
    return this.prisma.tag.create({
      data: {
        tag_name: tagName,
      },
    });
  }
}
