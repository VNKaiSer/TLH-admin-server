import { ApiProperty } from '@nestjs/swagger';

export class DiscountDTO {
  @ApiProperty({
    type: String,
    description: 'code được khách hàng nhập vào',
  })
  code: string;
}
