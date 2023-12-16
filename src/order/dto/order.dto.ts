import { CustomerToDB } from '@app/customer/dto/customerToDB';
import { OrderStatus } from '@app/typeDef/order.enum';
import { ApiProperty } from '@nestjs/swagger';
import { OrderDetailDTO } from './orderDetail.dto';

export class OrderDTO {
  id: number;
  @ApiProperty({
    type: String,
    description: 'Ghi chú',
    example: 'Giao giờ hành chính',
  })
  description: string;
  createAt: string;
  customerId: number;
  updateAt: string;
  @ApiProperty({
    type: String,
    description: 'Đang giao hàng',
    example: 'WAITING_FOR_ACCEPT',
  })
  status: OrderStatus;
  phone: string;
  @ApiProperty({
    type: Number,
    description: 'Tổng tiền đơn hàng',
    example: 1000000,
  })
  totalPrice: number;
  @ApiProperty({
    type: [OrderDetailDTO],
    description: 'Chi tiết đơn hàng',
  })
  details: OrderDetailDTO[];
}
export { CustomerToDB };
