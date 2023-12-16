import { Respone } from '@app/common/common.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { products } from '@prisma/client';
import { ProductService } from './product.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private service: ProductService) {}
  @Get()
  async getProducts(): Promise<Respone | any> {
    return this.service
      .getProducts()
      .then((result) => {
        return {
          success: true,
          message: 'Lấy danh sách sản phẩm thành công',
          status: HttpStatus.OK,
          data: result,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Post()
  @ApiBody({ type: ProductDto })
  async createProduct(
    @Body('product') product: ProductDto,
    @Body('categoryId') categoryId: number,
    @Res() res: Respone,
  ) {
    return this.service
      .createProduct(product, categoryId)
      .then(() => {
        return {
          success: true,
          message: 'Thêm sản phẩm thành công',
          status: HttpStatus.CREATED,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Put(':id')
  @ApiBody({ type: ProductDto })
  @ApiProperty({ name: 'id', type: Number, example: 1 })
  async updateProduct(
    @Param('id') id: number,
    @Body() product: products,
  ): Promise<Respone> {
    await this.service
      .updateProduct(id, product)
      .then((result) => {
        return {
          success: true,
          message: 'Cập nhật sản phẩm thành công',
          status: HttpStatus.OK,
          data: result,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
    return {
      success: false,
      message: 'Cập nhật sản phẩm thất bại',
      status: HttpStatus.BAD_REQUEST,
    };
  }

  @Delete(':id')
  @ApiProperty({ name: 'id', type: Number, example: 1 })
  async deleteProduct(@Param('id') id: number): Promise<Respone> {
    await this.service
      .deleteProduct(id)
      .then(() => {
        return {
          success: true,
          message: 'Xóa sản phẩm thành công',
          status: HttpStatus.OK,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });

    return {
      success: false,
      message: 'Xóa sản phẩm thất bại',
      status: HttpStatus.BAD_REQUEST,
    };
  }
}
