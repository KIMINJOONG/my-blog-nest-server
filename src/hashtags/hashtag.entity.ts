import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import BoardHashtag from 'src/boardHashtags/BoardHashtag';
import { Board } from 'src/boards/board.entity';

@Table({
  charset: 'utf8mb4', // 한글에 이모티콘까지 가능
  collate: 'utf8mb4_general_ci',
})
export default class Hashtag extends Model {
  @Column({
    type: DataType.STRING,
    comment: '해쉬태그',
  })
  name?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '카테고리 코드',
  })
  categoryCode?: number;

  @BelongsToMany(() => Board, () => BoardHashtag)
  boardHashTag?: Board[];
}
