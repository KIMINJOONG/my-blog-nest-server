import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesService } from '../categories/categories.service';
import { Board } from './board.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [SequelizeModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService, CategoriesService],
})
export class BoardsModule {}
