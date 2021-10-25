import { Board } from '../board.entity';

export interface IBoardsResponse {
  totalCount: number;
  boards: Board[];
}
