import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { products } from '@prisma/client';
import { ProductToDB } from './dto/db/product.db';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    return await this.prisma.products.findMany({
      include: {
        product_price: true,
        product_image: true,
        variants: true,
        sales: true,
      },
    });
  }
  async getProduct(id: number) {
    return await this.prisma.products
      .findUnique({
        where: {
          id,
        },
      })
      .then((result) => {
        return {
          mess: 'Get product successfully',
          data: result,
        };
      })
      .catch((err) => {
        return {
          mess: 'Get product failed',
          data: err,
        };
      });
  }

  async createProduct(product: ProductToDB) {}

  async updateProduct(id: number, product: ProductDto) {
    await this.prisma.product_price.update({
      where: {
        id,
      },
      data: {
        price: product.product_price[0].price,
      },
    });

    await this.prisma.product_image.update({
      where: {
        id,
      },
      data: {
        path: product.product_image[0].path,
      },
    });
    const rs = await this.prisma.products
      .update({
        where: {
          id: id,
        },
        data: {
          name: product.name,
          description: product.description,
        },
      })
      .then((result) => {
        return {
          mess: 'Update product successfully',
          data: result,
        };
      })
      .catch((err) => {
        return {
          mess: 'Update product failed',
          data: err,
        };
      });
    console.log(rs);
    return rs;
  }

  async deleteProduct(id: number) {
    return await this.prisma.products.delete({
      where: {
        id: id,
      },
    });
  }
}
