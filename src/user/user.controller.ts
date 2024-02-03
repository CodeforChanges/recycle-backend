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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 생성 엔드포인트 입니다.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'id로 유저 데이터 받는 엔드포인트 입니다.' })
  @Get()
  async findOne(@Req() req: Request) {
    const user_id = req['user'].user_id;
    return await this.userService.findOne(+user_id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'id로 유저 업데이터 하는 엔드포인트 입니다.' })
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const user_id = req['user'].user_id;
    return await this.userService.update(+user_id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'id로 유저 삭제하는 엔드포인트 입니다.' })
  @Delete()
  async remove(@Req() req: Request) {
    const user_id = req['user'].user_id;
    return await this.userService.remove(+user_id);
  }
}
