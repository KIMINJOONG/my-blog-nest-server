import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IBoardsResponse } from './type/response';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getAll(): Promise<IBoardsResponse> {
    return this.boardsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: number): Promise<Board> {
    return this.boardsService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() boardData: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(boardData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  patch(
    @Param('id') id: number,
    @Body() updateData: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsService.update(id, updateData);
  }
}
