import { Controller } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {
    // TODO: like CRUD 작성
    /**
     * GET() : 사용자가 좋아요 누른 모든 게시물 받아오기
     * POST() : 포스트 좋아요 누를시 호출되는 엔드포인트
     * DELETE(user_id, post_id) : 포스트 좋아요 취소시 호출되는 엔드포인트
     *  - user_id는 request.user.user_id에서 추출 가능.
     *  - post_id는 파라미터로 받기
     */
  }
}
