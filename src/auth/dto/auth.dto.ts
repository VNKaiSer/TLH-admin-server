import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({
    example: '0123456789',
    description: 'Số điện thoại người dùng',
  })
  phone: string;
  @ApiProperty({
    example: '123456',
    description: 'Mật khách hàng',
  })
  password: string;
}
