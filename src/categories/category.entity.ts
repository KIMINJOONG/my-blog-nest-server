import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Board } from 'src/boards/board.entity';

@Table({
  charset: 'utf8mb4', // 한글에 이모티콘까지 가능
  collate: 'utf8mb4_general_ci',
})
export class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    comment: '코드',
  })
  code!: number;

  @Column({
    type: DataType.TEXT,
    comment: '코드명',
  })
  name!: string;

  @HasMany(() => Board)
  boards?: Board;
}
