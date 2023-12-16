import { ApiProperty } from '@nestjs/swagger';

export class ProductImage {
  @ApiProperty({
    example: 'T-Shirt',
    description: 'Hình ảnh chính',
  })
  path: string;
  @ApiProperty({
    example: 'hình ảnh của chiếc áo',
    description: 'Mô tả',
  })
  alt: string;
  active: number;
}
