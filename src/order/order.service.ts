import { CustomerService } from '@app/customer/customer.service';
import { Injectable } from '@nestjs/common';
import { customers } from '@prisma/client';
import { OrderBody } from './dto/order.body';
import { OrderUpdate } from './dto/order.update';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private customerService: CustomerService,
  ) {}

  async create(phone: string, data: OrderBody): Promise<customers | any> {
    const cus = await this.customerService.findByPhone(data.order.phone);
    if (!cus) {
      throw new Error('Không tìm thấy khách hàng');
    }
    data.order.customerId = cus.id;
    return await this.orderRepository.create(data);
  }

  async findOrderByPhone(phone: string): Promise<customers | any> {
    const cus = await this.customerService.findByPhone(phone);
    if (!cus) {
      throw new Error('Không tìm thấy khách hàng');
    }
    return await this.orderRepository.findByOrderByUser(cus.id);
  }

  async getAll(): Promise<customers[] | any> {
    return this.orderRepository.findAll();
  }
  async update(id: number, data: OrderUpdate): Promise<customers | any> {
    return this.orderRepository.update(id, data);
  }

  // async isExisting(phone: string) {
  //   // return this.orderRepository.findByPhone(phone);
  // }
}
