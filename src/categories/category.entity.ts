import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Board } from 'src/boards/board.entity';

@Table({
  charset: 'utf8mb4', // 한글에 이모티콘까지 가능
  collate: 'utf8mb4_general_ci',
})
export class Category extends Model {
  @Column
  code: number;

  @Column
  name: string;

  @HasMany(() => Board)
  boards?: Board;
}
