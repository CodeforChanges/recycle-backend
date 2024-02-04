import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponseDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteUserResponseDto } from './dto/delete-user.dto';
import { FindOneUserResponseDto } from './dto/findOne-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 생성 엔드포인트 입니다.' })
  @ApiResponse({
    status: 201,
    description: '유저 생성 성공',
    type: CreateUserResponseDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'user_id로 유저 데이터 받는 엔드포인트 입니다.' })
  @ApiResponse({
    status: 200,
    description: '유저 데이터 받기 성공',
    type: FindOneUserResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user_id를 보내주세요.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '유저 업데이트 하는 엔드포인트 입니다.' })
  @ApiResponse({
    status: 200,
    description: '유저 업데이트 성공',
    type: UpdateUserResponseDto,
  })
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const user_id = req['user'].user_id;
    return await this.userService.update(+user_id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '유저 삭제하는 엔드포인트 입니다.' })
  @ApiResponse({
    status: 200,
    description: '유저 삭제 성공',
    type: DeleteUserResponseDto,
  })
  @Delete()
  async remove(@Req() req: Request) {
    const user_id = req['user'].user_id;
    return await this.userService.remove(+user_id);
  }
}
