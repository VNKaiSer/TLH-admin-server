import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { customers } from '@prisma/client';
import { MembershipDTO } from './dto/membership.dto';
import { ActiveMemberDTO } from './dto/member.dto';

@Injectable()
export class CustomerService {
  async createMembership(phone: string, data: ActiveMemberDTO) {
    const cus: customers = await this.isExisting(phone);
    if (!cus) {
      throw new Error('Không tìm thấy khách hàng');
    }

    return await this.customerRepository.createMembership(cus.id, data);
  }
  // async updateMembership(phone: string, data: MembershipDTO) {
  //   const cus: customers = await this.isExisting(phone);
  //   if (!cus) {
  //     throw new Error('Không tìm thấy khách hàng');
  //   }

  //   data.customerId = cus.id;
  //   return await this.customerRepository.updateMembership(data, cus.isMembership);
  // }
  constructor(private customerRepository: CustomerRepository) {}

  async register(customers: any): Promise<customers | any> {
    return this.customerRepository.register(customers);
  }

  async findByPhone(phone: string): Promise<customers | any> {
    return await this.customerRepository.findByPhone(phone);
  }

  async getAll(): Promise<customers[] | any> {
    return this.customerRepository.findAll();
  }

  async delete(phone: string): Promise<boolean | any> {
    return await this.customerRepository.delete(phone);
  }

  async update(phone: string, data: any): Promise<customers | any> {
    return this.customerRepository.update(phone, data);
  }

  async isExisting(phone: string): Promise<customers | any> {
    return this.customerRepository.findByPhone(phone);
  }
}
