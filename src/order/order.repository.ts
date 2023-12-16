import { PrismaService } from '@app/prisma/prisma.service';
import { OrderStatus } from '@app/typeDef/order.enum';
import { Injectable } from '@nestjs/common';
import { customers } from '@prisma/client';
import { OrderBody } from './dto/order.body';
import { OrderDTO } from './dto/order.dto';
import { customerUntil } from './utils/customerUntil';
import { OrderUpdate } from './dto/order.update';

@Injectable()
export class OrderRepository {
  constructor(
    private prisma: PrismaService,
    private customerUntil: customerUntil,
  ) {}
  async create(data: OrderBody): Promise<customers | any> {
    const dataOrder = data.order;
    if (data.discount) {
      const discount = await this.customerUntil.checkCustomerUseCode(
        dataOrder.phone,
        data.discount.code,
      );

      if (discount) {
        dataOrder.totalPrice = dataOrder.totalPrice - discount.discount;
      }
    }

    const order = await this.prisma.orders.create({
      data: {
        customerId: dataOrder.customerId,
        description: dataOrder.description,
        status: OrderStatus.WAITING_FOR_ACCEPT,
        updateAt: new Date(),
        totalPrice: dataOrder.totalPrice,
      },
    });

    if (order) {
      dataOrder.details.map(async (item) => {
        let data: any;
        if (item.selectDate && item.selectTime) {
          data = {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            option: item.option,
            selectDate: new Date(item.selectDate),
            selectTime: new Date(item.selectTime),
          };
        } else {
          data = {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            option: item.option,
          };
        }
        console.log(data);
        const od = await this.prisma.order_details.create({
          data: data,
        });
        console.log(od);
      });
      return {
        data: order,
      };
    }

    throw new Error('500 - Internal Server Error');
  }

  async findAll() {
    const orders = await this.prisma.orders.findMany({
      include: {
        orderDetail: true,
        customer: true,
      },
    });
    //find product with productId in orderDetail
    const productOfOrder = await Promise.all(
      orders.map(async (item) => {
        const orderDetail = await Promise.all(
          item.orderDetail.map(async (detail) => {
            const product = await this.prisma.products.findUnique({
              where: {
                id: detail.productId,
              },
            });
            const productPirce = await this.prisma.product_price.findUnique({
              where: {
                product_id: product.id,
              },
            });
            const productImage = await this.prisma.product_image.findUnique({
              where: {
                product_id: product.id,
              },
            });

            return {
              ...detail,
              product: {
                ...product,
                product_price: [productPirce],
                product_image: [productImage],
              },
            };
          }),
        );

        return {
          ...item,
          orderDetail,
        };
      }),
    );

    return productOfOrder;
  }

  async findOne(id: number) {
    return this.prisma.orders.findUnique({
      where: { id },
    });
  }

  async findByOrderByUser(cusId: number): Promise<OrderDTO | any> {
    return this.prisma.orders.findMany({
      where: { customerId: cusId },
      include: {
        orderDetail: true,
      },
    });
  }

  async update(id: number, data: OrderUpdate): Promise<OrderDTO | any> {
    return this.prisma.orders.update({
      where: { id: Number(id) },
      data: {
        status: data.status,
        updateAt: new Date(),
      },
    });
  }
}
