import { PrismaService } from '@app/prisma/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth/auth.module';
import { CommonModule } from '@app/common/common.module';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  providers: [ProductService, ProductRepository, PrismaService],
  controllers: [ProductController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([]),
    PrismaModule,
    CommonModule,
  ],
})
export class ProductModule {}
