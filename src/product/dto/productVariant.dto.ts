// model product_variants {
//   id               Int                @id @default(autoincrement())
//   key              String
//   label            String
//   type             String
//   default          String
//   isVisible        Int                @default(0)
//   variants_options variants_options[]
//   proId            Int
//   products         products           @relation(fields: [proId], references: [id])
// }

import { VariantOption } from './variantOption.dto';

export class ProductVariant {
  key: string;
  label: string;
  type: string;
  default: string;
  isVisible: number;
  variants_options: VariantOption;
}
