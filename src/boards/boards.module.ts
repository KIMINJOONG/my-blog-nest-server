import { Module } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, CategoriesService],
})
export class BoardsModule {}
