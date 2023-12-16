import { OmitType } from '@nestjs/swagger';
import { VariantOption } from '../variantOption.dto';

export class VariantOptionDB extends OmitType(VariantOption, ['price_change']) {
  product_variants_Id: number;
}
