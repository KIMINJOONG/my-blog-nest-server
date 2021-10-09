import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { JoinDto } from './dto/join.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async join(joinData: JoinDto) {
    const user = await User.findOne({ where: { email: joinData.email } });
    if (user) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }
    const saltOrRounds = 10;
    const password = await bcrypt.hash(joinData.password, saltOrRounds);
    const data = { ...joinData, password };
    const newUser = await User.create(data);

    return newUser;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await User.findOne({ where: { email } });
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      user.password = '';
      return user;
    }
  }

  async login(user: User) {
    const payload = { name: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      message: '로그인되었습니다.',
      data: user,
    };
  }
}
