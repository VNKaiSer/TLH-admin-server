import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PromotionDTO } from './dto/promotion.dto';
import { promotions } from '@prisma/client';
import { CodeDTO } from './dto/code.dto';
@Injectable()
export class PromotionRepository {
  async getAllCode() {
    return this.prisma.code.findMany({});
  }
  async createCode(data: CodeDTO) {
    const code = await this.prisma.code.findUnique({
      where: {
        name: data.name,
      },
    });

    if (code) {
      throw new Error('Mã đã tồn tại');
    }

    return this.prisma.code.create({
      data: {
        name: data.name,
        discount: data.discount,
        type: data.type,
        quantity: data.quantity,
        promotionId: 1,
        start_date: new Date(data.startDate),
        end_date: new Date(data.endDate),
        updateAt: new Date(),
      },
    });
  }

  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.promotions.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.promotions.findUnique({
      where: { id },
    });
  }

  async create(data: PromotionDTO) {
    return this.prisma.promotions.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: number): Promise<boolean | any> {
    return this.prisma.promotions.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async update(data: any): Promise<promotions | any> {}
}
