import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '@app/prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { CommonModule } from '@app/common/common.module';
import { CustomerModule } from '@app/customer/customer.module';
import { customerUntil } from './utils/customerUntil';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, customerUntil],
  imports: [forwardRef(() => CustomerModule), PrismaModule, CommonModule],
  exports: [OrderService],
})
export class OrderModule {}
