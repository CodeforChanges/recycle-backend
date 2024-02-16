import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      timeout: configService.get('HTTP_TIMEOUT'),
      maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
    }),
    inject: [ConfigService],
  }),
            MulterModule.register({
              dest:'./upload'
            })],
  providers: [ModelService, JwtService],
  controllers: [ModelController]
})
export class ModelModule {}
