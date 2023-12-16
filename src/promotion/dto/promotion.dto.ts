import { ApiProperty } from '@nestjs/swagger';

export class PromotionDTO {
  @ApiProperty({
    type: String,
    description: 'Link banner khuyến mãi',
  })
  link: string;
  //   @ApiProperty({
  //     type: String,
  //     description: 'Mô tả',
  //   })
  //   desc: string;
}
