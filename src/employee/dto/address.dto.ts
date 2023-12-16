import { ApiProperty } from '@nestjs/swagger';

export class AddresDTO {
  @ApiProperty({
    example: 'VN',
    description: 'Quốc gia',
  })
  country: string;
  @ApiProperty({
    example: 'Hà Nội',
    description: 'Tinh',
  })
  province: string;
  @ApiProperty({
    example: 'Hà Nam',
    description: 'Quận(Huyện)',
  })
  district: string;
  @ApiProperty({
    example: 'F 12',
    description: 'Phường',
  })
  ward: string;
  @ApiProperty({
    example: 'Tô Ngọc Phân',
    description: 'Đường',
  })
  street: string;
}
