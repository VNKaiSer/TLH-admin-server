import { PrismaService } from '@app/prisma/prisma.service';

export class customerUntil {
  constructor(private prisma: PrismaService) {}
  async checkCustomerUseCode(phone: string, codeName: string) {
    const customer = await this.prisma.customers.findUnique({
      where: {
        phone: phone,
      },
      select: {
        id: true,
      },
    });

    // check code
    const code = await this.prisma.code.findUnique({
      where: {
        name: codeName,
      },
      select: {
        id: true,
        discount: true,
        end_date: true,
      },
    });

    // check customer, code
    if (!customer || !code) {
      throw new Error('500 - Internal Server Error');
    }

    if (code.end_date < new Date()) {
      throw new Error('Mã đã hết hạn');
    }

    // check customer use code
    const isUse = await this.prisma.customer_on_code.findMany({
      where: {
        codeId: code.id,
        customerId: customer.id,
      },
    });

    if (isUse.length > 0) {
      throw new Error('Mã này đã được sử dụng');
    }

    const discoutHis = await this.prisma.customer_discount_history.create({
      data: {
        customerId: customer.id,
        discount: code.discount,
      },
    });

    if (discoutHis) {
      throw new Error('500 - Internal Server Error');
    }

    const customerUseCode = await this.prisma.customer_on_code.create({
      data: {
        codeId: code.id,
        customerId: customer.id,
        status: 1,
        discountId: discoutHis.id,
      },
    });

    if (customerUseCode) {
      // giảm số lượng của code
      this.prisma.code.update({
        where: {
          name: codeName,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
      return {
        discount: code.discount,
      };
    }

    throw new Error('500 - Internal Server Error');
  }

  async afficiateAction(phone: string, data: any) {
    const cus = await this.prisma.customers.findUnique({
      where: {
        phone,
      },
      select: { isMembership: true },
    });

    if (cus.isMembership === false) {
      return this.prisma.customer_membership.create({
        data: {
          customerId: data.customerId,
          points: data.points,
        },
      });
    }

    return this.prisma.customer_membership.update({
      where: {
        customerId: data.customerId,
      },
      data: {
        points: {
          increment: data.points,
        },
      },
    });
  }
}
