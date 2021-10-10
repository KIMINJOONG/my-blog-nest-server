import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Board } from 'src/boards/board.entity';
import Hashtag from 'src/hashtags/hashtag.entity';

@Table({
  charset: 'utf8mb4', // 한글에 이모티콘까지 가능
  collate: 'utf8mb4_general_ci',
})
export default class BoardHashtag extends Model<BoardHashtag> {
  @ForeignKey(() => Board)
  @Column
  boardId!: number;

  @ForeignKey(() => Hashtag)
  @Column
  hashtagId!: number;
}
