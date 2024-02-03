import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { comparePassword } from 'src/user/lib/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    const { user_email, user_password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: {
        user_email,
      },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저 입니다.');
    }

    const isValidPass = await comparePassword({
      enteredPassword: user_password,
      hashedPassword: user.user_password,
    });

    if (!isValidPass) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = {
      user_email,
      user_id: user.user_id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
