import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ImagesService {
  async getAll(): Promise<[]> {
    return [];
  }
}
