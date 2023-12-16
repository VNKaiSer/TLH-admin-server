import { ApiProperty } from '@nestjs/swagger';
import { AddresDTO } from './address.dto';

export class EmployeeDTO {
  @ApiProperty({
    example: 'Jhon',
    description: 'Tên nhân viên',
  })
  name: string;
  @ApiProperty({
    example: '2002-01-01T00:00:00.000Z',
    description: 'Birthday',
    format: 'date-time',
  })
  dob: string;
  @ApiProperty({
    example: '0987654321',
    description: 'Số điện thoại',
  })
  phone: string;
  @ApiProperty({
    example: 'https://avt.png',
    description: 'Link ảnh đại diện',
  })
  avt: string;
  @ApiProperty({
    example: 'jhon@gmail.com',
    description: 'Email',
  })
  email: string;
  @ApiProperty({
    example: 'true',
    description: 'Trạng thái hoạt động',
  })
  isActived: string;
  @ApiProperty({
    example: '123456',
    description: 'Mật khẩu',
  })
  passwordHash: string;
  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'Ngày tạo',
    format: 'date-time',
  })
  createAt: string;
  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'Ngày cập nhật',
  })
  updateAt: string;
  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'Ngày đăng nhập',
    format: 'date-time',
  })
  lastLogin: string;
  @ApiProperty({
    title: 'địa chỉ',
    type: AddresDTO,
    example: {
      country: 'VN',
      province: 'Hà Nội',
      district: 'Hà Nam',
      ward: 'F 12',
      street: 'Tô Ngọc Phân',
    },
  })
  address: AddresDTO;
}
