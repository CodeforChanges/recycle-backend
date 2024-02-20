import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { GarbageClassificationRequestDto } from './dto/garbage-classification-request.dto';
import { ConfigService } from '@nestjs/config';
import { ModelRequestResponse } from './dto/model-request-response.dto';

@Injectable()
export class AiService {
  conn: any;
  channel: any;
  memory = {};

  constructor(private readonly configService: ConfigService) {
    this.initMQ();
  }

  private async initMQ() {
    const url = this.configService.get('RECYCLE_AI_MQ_URL');

    this.conn = await amqplib.connect(url);
    this.channel = await this.conn.createChannel();

    this.channel.consume('garbage_classification_results', (body) => {
      const response = JSON.parse(body);
      this.memory[response['id']] = response;
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

  getGarbageClassificationResult(id: number) {
    return this.memory[id] ?? undefined;
  }
}
