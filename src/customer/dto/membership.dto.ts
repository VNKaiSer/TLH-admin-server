import { ApiProperty } from '@nestjs/swagger';

export class MembershipDTO {
  @ApiProperty({
    type: Number,
    description: 'Mã khách hàng',
    example: 1,
  })
  customerId: number;
  @ApiProperty({
    type: Number,
    description: 'Số điểm tích luỹ',
    example: 10,
  })
  points: number;
}
