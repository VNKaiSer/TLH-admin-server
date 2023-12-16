import { OmitType } from '@nestjs/swagger';
import { ProductVariant } from '../productVariant.dto';

export class productVariantDB extends OmitType(ProductVariant, [
  'variants_options',
]) {
  product_id: number;
}
