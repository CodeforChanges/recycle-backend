import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [PostController],
  providers: [PostService, PrismaService, JwtService],
})
export class PostModule {}
