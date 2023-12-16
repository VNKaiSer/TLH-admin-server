import { OrderStatus } from '@app/typeDef/order.enum';
import { ApiProperty } from '@nestjs/swagger';

export class OrderUpdate {
  @ApiProperty({
    type: String,
    description: 'Trạng thái',
    example: OrderStatus.DELIVERING,
  })
  status: OrderStatus;
}
