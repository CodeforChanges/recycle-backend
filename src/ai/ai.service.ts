import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { GarbageClassificationRequestDto } from './dto/garbage-classification-request.dto';
import { ConfigService } from '@nestjs/config';
import { ModelRequestResponse } from './dto/model-request-response.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AiService {
  conn: any;
  channel: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.initMQ();
  }

  private async initMQ() {
    const url = this.configService.get('RECYCLE_AI_MQ_URL');

    this.conn = await amqplib.connect(url);
    this.channel = await this.conn.createChannel();

    this.channel.consume('garbage_classification_results', async (body) => {
      this.channel.ack(body);

      const response = JSON.parse(body.content.toString());
      console.log(response);

      await this.prismaService.aiResults.create({
        data: {
          id: response['id'].toString(),
          data: response['data'].toString(),
          result: JSON.stringify(response['result']),
        },
      });
    });
  }

  async garbageClassificationRequest(
    dto: GarbageClassificationRequestDto,
  ): Promise<ModelRequestResponse> {
    const datetime = Date.now();

    const body = {
      id: datetime,
      data: dto.imageUrl,
    };

    this.channel.sendToQueue(
      'garbage_classification_requests',
      Buffer.from(JSON.stringify(body)),
    );

    const request = new ModelRequestResponse();
    request.id = body.id;

    return request;
  }

  async getGarbageClassificationResult(id: string) {
    const result = await this.prismaService.aiResults.findUnique({
      where: { id: id },
    });

    result['result'] = JSON.parse(result['result']);

    return result;
  }
}
