import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';
import { ProductToDB } from './dto/db/product.db';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProducts() {
    return await this.productRepository.getProducts();
  }

  async createProduct(productDto: ProductDto, categoryId: number) {
    const compare: ProductToDB = {
      ...productDto,
      categoriesId: categoryId,
    };

    return await this.productRepository.createProduct(compare);
  }

  async updateProduct(id: number, product: any) {
    return await this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: number) {
    return await this.productRepository.deleteProduct(id);
  }
}
