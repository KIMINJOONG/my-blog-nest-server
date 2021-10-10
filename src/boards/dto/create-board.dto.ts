import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

@ApiTags('게시글 생성 요청 데이터')
export class CreateBoardDto {
  @IsString()
  @ApiProperty({ type: String, description: '제목' })
  readonly title: string;

  @IsString()
  @ApiProperty({ type: String, description: '내용' })
  readonly content: string;

  @IsNumber()
  @ApiProperty({ type: String, description: '조회수' })
  readonly view: string;

  @IsNumber()
  @ApiProperty({ type: Array, description: '카테고리 id' })
  readonly categoryId: number[];
}
