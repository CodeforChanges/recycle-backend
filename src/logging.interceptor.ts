import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { headers, query, body } = request;

    // 요청 로깅
    console.log('Request Headers:', headers);
    console.log('Query Parameters:', query);
    console.log('Request Body:', body);

    return next.handle().pipe(
      tap(() => {
        // 응답 로깅
        const response = ctx.getResponse();
        // 응답 본문 출력
        console.log('Response Body:', response.body);
      }),
    );
  }
}
