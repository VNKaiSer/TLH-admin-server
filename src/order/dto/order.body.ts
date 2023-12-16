import { ApiProperty } from '@nestjs/swagger';
import { DiscountDTO } from './discount.dto';
import { OrderDTO } from './order.dto';

export class OrderBody {
  @ApiProperty({
    type: OrderDTO,
  })
  order: OrderDTO;
  @ApiProperty({
    type: DiscountDTO,
  })
  discount?: DiscountDTO;
}
