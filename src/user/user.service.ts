import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hashPassword } from './lib/hash';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { user_email, user_image, user_name, user_nickname, user_password } =
      createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        user_email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('이미 존재하는 유저입니다.');
    }

    const hashedPassword = await hashPassword(user_password);

    return await this.prisma.user.create({
      data: {
        user_email,
        user_image,
        user_name,
        user_nickname,
        user_password: hashedPassword,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { user_image, user_nickname } = updateUserDto;
    return await this.prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        user_image,
        user_nickname,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        user_id: id,
      },
    });
  }
}
