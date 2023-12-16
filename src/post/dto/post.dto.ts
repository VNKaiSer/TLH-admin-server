import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty({
    title: 'Tiêu đề',
    example: 'Kem trộn',
    type: String,
  })
  title: string;
  @ApiProperty({
    title: 'Nội dung',
    example: 'Kem trộn là một loại mỹ phẩm provip hehe',
    type: String,
  })
  content: string;
  @ApiProperty({
    title: 'Tóm tét',
    example: 'Kem trộn là gì',
    type: String,
  })
  sumary: string;
  @ApiProperty({
    title: 'Hình',

    example: 'kem trộn',
  })
  image: string;
  createAt: Date;
  @ApiProperty({
    title: 'Cập nhật',
    example: '2020-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updateAt?: Date;
  @ApiProperty({
    title: 'Trạng thái',
    example: '1',
  })
  status: string;
}
