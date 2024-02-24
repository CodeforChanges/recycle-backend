import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Test for CI/CD Hello Code for Changes!';
  }
}
