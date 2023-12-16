import { AuthModule } from '@app/auth/auth.module';
import { PrismaModule } from '@app/prisma/prisma.module';

import { Module, forwardRef } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { CommonModule } from '@app/common/common.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  imports: [forwardRef(() => AuthModule), PrismaModule, CommonModule],
  exports: [EmployeeService],
})
export class EmployeeModule {}
