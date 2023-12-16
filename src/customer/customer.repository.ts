import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { customers } from '@prisma/client';
import { CustomerToDB } from './dto/customerToDB';
import { ActiveMemberDTO } from './dto/member.dto';

@Injectable()
export class CustomerRepository {
  async createMembership(id: number, data: ActiveMemberDTO) {
    const active = await this.prisma.customers.update({
      where: { id },
      data: {
        isMembership: true,
        referral_code: data.referral_code ? data.referral_code : '',
        introduce_code: data.introduce_code ? data.introduce_code : '',
        email: data.email,
        dob: data.dob,
      },
    });

    if (!active) {
      throw new Error('500 - Internal Server Error');
    }

    if (data.introduce_code) {
      const cus_ref = await this.prisma.customers.findUnique({
        where: { phone: data.introduce_code },
      });

      return this.prisma.customer_membership.update({
        where: { customerId: cus_ref.id },
        data: {
          ref_num: {
            increment: 1,
          },
        },
      });
    }
  }

  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customers.findMany();
  }

  async findOne(id: number) {
    return this.prisma.customers.findUnique({
      where: { id },
    });
  }

  async register(data: CustomerToDB) {
    return this.prisma.customers.create({
      data,
    });
  }

  async findByPhone(phone: string): Promise<customers | any> {
    return this.prisma.customers.findUnique({
      where: { phone },
      include: {
        address: true,
      },
    });
  }

  async delete(phone: string): Promise<boolean | any> {
    return await this.prisma.customers.update({
      where: { phone },
      data: {
        isActived: false,
      },
    });
  }

  async update(phone: string, data: any): Promise<customers | any> {
    const user = await this.prisma.customers.findUnique({
      where: { phone },
    });
    data.phone = phone;
    if (!user) {
      if (data.address) {
        await this.prisma.address.create({
          data: data.address,
        });
      }
      return await this.prisma.customers.create({
        data: {
          ...data,
          addressId: data.address ? data.address.id : null,
        },
      });
    }
    if (user.addressId === null && data.address) {
      const addressCreate = await this.prisma.address.create({
        data: data.address,
      });
      await this.prisma.customers.update({
        where: { phone },
        data: {
          addressId: addressCreate.id,
        },
      });
    } else {
      await this.prisma.address.update({
        where: { id: user.addressId },
        data: data.address,
      });
    }

    const dataUpdate = {
      ...data,
      dob: data.dob ? new Date(data.dob) : null,
    };
    delete dataUpdate.address;

    const result = await this.prisma.customers
      .update({
        where: { phone },
        data: dataUpdate,
      })
      .then((result) => {
        console.log('rs ' + result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    return result;
  }
}
