import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import BoardHashtag from 'src/boardHashtags/BoardHashtag';
import { Category } from 'src/categories/category.entity';
import Hashtag from 'src/hashtags/hashtag.entity';

@Table({
  charset: 'utf8mb4', // 한글에 이모티콘까지 가능
  collate: 'utf8mb4_general_ci',
})
export class Board extends Model {
  @Column
  title: string;

  @Column
  content: string;

  @Column
  view: string;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => Hashtag, () => BoardHashtag)
  boardHashtag?: Hashtag[];
}
