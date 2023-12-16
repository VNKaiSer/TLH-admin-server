import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PromotionModule } from './promotion/promotion.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    AuthModule,
    ProductModule,
    CustomerModule,
    EmployeeModule,
    PostModule,
    OrderModule,

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PromotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
