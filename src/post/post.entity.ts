import { posts } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PostEntity implements posts {
  @ApiProperty({ type: ' number' })
  id: number;
  @ApiProperty({ type: 'string' })
  title: string;
  @ApiProperty({ type: 'string' })
  content: string;
  @ApiProperty({ type: 'string' })
  sumary: string;
  @ApiProperty({ type: 'string' })
  image: string;
  @ApiProperty({ type: 'Date' })
  createAt: Date;
  @ApiProperty({ type: 'Date', required: false })
  updateAt: Date;
  @ApiProperty({ type: 'string' })
  status: string;
}
