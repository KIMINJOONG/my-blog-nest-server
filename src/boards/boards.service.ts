import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/categories/category.entity';
import Hashtag from 'src/hashtags/hashtag.entity';
import { CategoriesService } from '../categories/categories.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoarDto } from './dto/get-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IBoardsResponse } from './type/response';

@Injectable()
export class BoardsService {
  constructor(private readonly categoriesService: CategoriesService) {}
  async getAll(query: GetBoarDto): Promise<IBoardsResponse> {
    const { count, rows } = await Board.findAndCountAll({
      include: [{ model: Category }],
      attributes: ['id', 'title', 'view', 'createdAt'],
      limit: parseInt(query.limit),
    });
    return { totalCount: count, boards: rows };
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
      const hashtags: string[] = boardData.hashtags.match(/#[^\s]+/g);
      const board: Board = await Board.create({
        title: boardData.title,
        content: boardData.content,
      });

      const category = await this.categoriesService.getOne(1);
      board.category = category;

      if (hashtags) {
        await Promise.all(
          hashtags.map(async (tag: string) => {
            tag = tag.replace(/<(.|\n)*?>/g, '');
            tag = tag.trim();
            const newHashtags: Hashtag = await Hashtag.create({
              name: tag.slice(1).toLowerCase(),
            });
            board.$add('boardHashtag', newHashtags);
            return;
          }),
        );
      }

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
