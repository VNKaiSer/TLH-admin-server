import { ApiProperty } from '@nestjs/swagger';

export class CodeDTO {
  @ApiProperty({
    type: String,
    description: 'Mã code',
    example: 'TLH-PM123',
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'Loại mã',
    example: 'Loại 1',
  })
  type: string;
  @ApiProperty({
    type: Number,
    description: 'Số lượng mã',
    example: '10',
  })
  quantity: number;
  @ApiProperty({
    type: Number,
    description: 'Gia giảm',
    example: '100000',
  })
  discount: number;
  @ApiProperty({
    type: String,
    description: 'Ngày bắt đầu',
    example: '2020-10-10 00:00:00',
    format: 'DateTime',
  })
  startDate: string;
  @ApiProperty({
    type: String,
    description: 'Ngày kết thúc',
    example: '2020-10-10 00:00:00',
    format: 'DateTime',
  })
  endDate: string;
}
