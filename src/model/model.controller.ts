import { BadRequestException, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ModelService } from './model.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { response } from 'express';
import { error } from 'console';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('model')
export class ModelController {
    constructor(private readonly modelservice: ModelService,
                private readonly httpService: HttpService){}
    
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: '모델' })
    @ApiResponse({
        status: 200,
        description: '모델',
    })
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async predict(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        console.log(JSON.stringify(file, null, 2));
        const result = this.httpService.post('http://localhost:5000/classify', {file}).subscribe({
            next: (response) =>{
            },
            error: (error) => {
                return new BadRequestException("error");
            },
            complete: () =>{
                console.log("Success")
            }
        })
        return file;
    }
}
