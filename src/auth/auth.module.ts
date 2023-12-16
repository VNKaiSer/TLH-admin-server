import { PrismaModule } from '@app/prisma/prisma.module';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { CommonModule } from '@app/common/common.module';
import { EmployeeModule } from '@app/employee/employee.module';

@Module({
  imports: [
    forwardRef(() => EmployeeModule),
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    CommonModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
