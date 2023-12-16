import { ApiProperty } from '@nestjs/swagger';

export class ActiveMemberDTO {
  @ApiProperty({
    type: String,
    description: 'Số điện thoại',
    example: 'user.phone',
  })
  introduce_code?: string;
  @ApiProperty({
    type: String,
    description: 'Email khách hàng',
    example: 'a@gmail.com',
  })
  email?: string;
  @ApiProperty({
    type: String,
    description: 'Ngày sinh',
    example: '2020-10-10',
  })
  dob?: string;
  @ApiProperty({
    type: String,
    description: 'Mã giảm giá ',
    example: 'TLH-PM123',
  })
  referral_code?: string;
}
