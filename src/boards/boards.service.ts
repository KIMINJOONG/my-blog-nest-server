import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly categoriesService: CategoriesService) {}
  async getAll(): Promise<Board[]> {
    const boards = await Board.findAll({
      include: ['category'],
      order: [['id', 'desc']],
    });
    return boards;
  }

  async getOne(id: number): Promise<Board> {
    try {
      const board: Board = await Board.findOne({
        where: { id },
        include: ['category'],
      });
      if (!board) {
        throw new NotFoundException(`Board with ID ${board.id} not found.`);
      }
      return board;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOne(id: number): Promise<Board> {
    try {
      const board: Board = await this.getOne(id);
      await board.destroy();
      return board;
    } catch (error) {}
  }

  async create(boardData: CreateBoardDto): Promise<Board> {
    try {
      const board: Board = await Board.create({
        title: boardData.title,
        content: boardData.content,
      });

      const category = await this.categoriesService.getOne(1);
      board.category = category;

      await board.save();
      return board;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async update(seq: number, updateData: UpdateBoardDto): Promise<Board> {
    try {
      const board: Board = await this.getOne(seq);

      const category = await this.categoriesService.getOne(1);
      board.category = category;

      board.title = updateData.title;
      board.content = updateData.content;
      await board.save();
      return board;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
