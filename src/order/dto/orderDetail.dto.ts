import { ProductToDB } from '@app/product/dto/db/product.db';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailDTO {
  orderId?: number;
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Mã sản phẩm',
  })
  productId: number;
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Số lượng',
  })
  quantity: number;
  @ApiProperty({
    type: String,
    description: 'Ngày đặt hàng',
    example: '2020-10-10',
    format: 'string',
  })
  selectDate?: string;
  @ApiProperty({
    type: Date,
    description: 'Giờ đặt hàng',
    example: '2020-10-10',
  })
  selectTime?: Date;
  @ApiProperty({
    type: String,
    description: 'Lựa chọn',
    example: '60p',
    format: 'string',
  })
  option: string;
}
