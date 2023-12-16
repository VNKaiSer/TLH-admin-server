import { ApiProperty } from '@nestjs/swagger';
import { Sale } from './sale.dto';
import { ProductVariant } from './productVariant.dto';
import { ProductImage } from './productImage.dto';
import { ProductPrice } from './productPrice.dto';

export class ProductDto {
  @ApiProperty({
    example: 'T-Shirt',
    description: 'Tên sản phẩm',
  })
  name: string;

  @ApiProperty({
    example: 'T-Shirt',
    description: 'Mô tả',
  })
  description: string;

  @ApiProperty({
    example: 'T-Shirt',
    description: 'Hình ảnh chính',
  })
  main_image: string;

  @ApiProperty({
    example: 'T-Shirt',
    description: 'Hình ảnh chính',
  })
  product_variants: ProductVariant;

  @ApiProperty({
    example: 'T-Shirt',
    description: 'Hình ảnh chính',
  })
  sales: Sale;

  @ApiProperty({
    example: 'T-Shirt',
    description: 'Hình ảnh chính',
  })
  product_image: ProductImage;

  @ApiProperty({
    type: ProductPrice,
    example: 2000,
    description: 'Hình ảnh chính',
  })
  product_price: ProductPrice;
}
