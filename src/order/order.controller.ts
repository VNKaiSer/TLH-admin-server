import { Respone } from '@app/common/common.type';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { OrderBody } from './dto/order.body';
import { OrderUpdate } from './dto/order.update';
import { OrderService } from './order.service';
// import { CustomerToDB } from './dto/orderToDB';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrder(): Promise<Respone> {
    return this.orderService
      .getAll()
      .then((result) => {
        return {
          success: true,
          message: 'Lấy danh đơn hàng thành công',
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

  @Put(':id')
  // @UseGuards(AuthGuard)
  @ApiBody({
    type: OrderUpdate,
    required: true,
    description: 'Chi tiết đơn hàng',
  })
  async updateStatus(
    @Param('id') id: number,
    @Body() data: OrderUpdate,
  ): Promise<Respone> {
    const updatedCus = await this.orderService.update(id, data);
    return {
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công',
      status: HttpStatus.ACCEPTED,
      data: updatedCus,
    };
  }

  @Get(':phone')
  // @UseGuards(AuthGuard)
  async getOrderByPhone(@Param('phone') phone: string): Promise<Respone> {
    return this.orderService
      .findOrderByPhone(phone)
      .then((result) => {
        if (result.length === 0) {
          return {
            success: true,
            message: 'Không tìm thấy đơn hàng nào từ khách hàng này',
            status: HttpStatus.OK,
          };
        }
        return {
          success: true,
          message: 'Danh sách đơn hàng ' + phone,
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
  // @UseGuards(AuthGuard)
  @ApiProperty({ name: 'phone', type: String, description: 'Số điện thoại' })
  @ApiBody({ type: OrderBody })
  async create(
    @Query('phone') phone: string,
    @Body('data') data: OrderBody,
  ): Promise<Respone> {
    return this.orderService
      .create(phone, data)
      .then((result) => {
        return {
          success: true,
          message: 'Đơn hàng đã được tạo',
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
}
