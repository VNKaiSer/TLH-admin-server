import { OrderDetailDTO } from '../orderDetail.dto';

export class OrderToDB extends OrderDetailDTO {
  orderId?: number;
  productId: number;
}
