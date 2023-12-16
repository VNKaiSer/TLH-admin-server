import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PromotionRepository } from './promotion.repository';
import { PrismaService } from '@app/prisma/prisma.service';

@Module({
  providers: [PromotionService, PromotionRepository, PrismaService],
  controllers: [PromotionController],
})
export class PromotionModule {}
