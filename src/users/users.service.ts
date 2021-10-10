import { Injectable, NotFoundException } from '@nestjs/common';
import { BasicResponseFormat, IBasicResponse } from 'src/responseData';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async getAll(): Promise<IBasicResponse<User[]>> {
    const users = await User.findAll();
    const response = BasicResponseFormat(200, '조회되었습니다.', users);
    return response;
  }
}
