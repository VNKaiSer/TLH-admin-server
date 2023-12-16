import { IsInt, IsNotEmpty } from 'class-validator';
import { ProductDto } from '../product.dto';

export class ProductToDB extends ProductDto {
  @IsNotEmpty()
  @IsInt()
  categoriesId: number;
}
