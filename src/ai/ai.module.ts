import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule],
  controllers: [AiController],
  providers: [AiService, PrismaService],
})
export class AiModule {}
