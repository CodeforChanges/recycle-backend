import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SearchService {
    constructor(private prisma: PrismaService) {}

    async searchByContent(keyword: string, user_id: number){
        const posts = await this.prisma.post.findMany({
            where:{
                post_content:{
                    contains: keyword
                },
            },
            include: {
                post_comments: {
                    select: {
                        comment_content: true,
                        comment_owner: {
                            select: {
                                user_id: true,
                                user_nickname: true,
                                user_image: true,
                            },
                        },
                        comment_id: true,
                        reg_date: true,
                    },
                    orderBy: {
                        reg_date: 'desc',
                    },
                },
                post_images: {
                    select:{
                        image_link: true,
                    }
                },
                post_likes: {
                    select: {
                        like_owner_id: true,
                        like_id: true,
                    },
                },
                post_owner: {
                    select: {
                        user_id: true,
                        user_nickname: true,
                        user_image: true,
                    },
                },
            },
            orderBy:{
                reg_date: 'desc'
            }
        });
        return posts.map((post) => ({
            post, 
            likesCount: post.post_likes.length,
            isLiked: post.post_likes.some((like) => like.like_owner_id === user_id)
        }))
    };

    async searchByHashtag(keyword: string, user_id: number){
        return "Hashtag";
    }
}
    
