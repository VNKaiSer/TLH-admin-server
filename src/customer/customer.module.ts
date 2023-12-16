import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '@app/auth/auth.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { CustomerCheck } from './customer.check';
import { CommonModule } from '@app/common/common.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, CustomerCheck],
  imports: [forwardRef(() => AuthModule), PrismaModule, CommonModule],
  exports: [CustomerService, CustomerCheck],
})
export class CustomerModule {}
