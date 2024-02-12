import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TagService],
  exports: [TagService],
})
export class TagModule {}
