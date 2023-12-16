import { IsInt, IsNotEmpty } from 'class-validator';
import { EmployeeDTO } from '../employee.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDB extends EmployeeDTO {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'Quyền nhân viên',
  })
  role_id: number;
  //   @IsNotEmpty()
  //   @IsInt()
  //   @ApiProperty({
  //     example: 1,
  //     description: 'Địa chỉ nhân viên',
  //   })
  //   address_id: number;
}
