import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  @ApiProperty({
    example: 'Admin',
    description: 'Tên quyền',
  })
  name: string;
}
