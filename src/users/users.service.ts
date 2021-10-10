import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async getAll(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }
}
