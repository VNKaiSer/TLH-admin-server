import { Injectable } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { PromotionDTO } from './dto/promotion.dto';
import { CodeDTO } from './dto/code.dto';

@Injectable()
export class PromotionService {
  async getAllCode() {
    return await this.promotionRepository.getAllCode();
  }
  async createCode(data: CodeDTO) {
    return await this.promotionRepository.createCode(data);
  }
  constructor(private promotionRepository: PromotionRepository) {}

  async getAll(): Promise<PromotionDTO[] | any> {
    return await this.promotionRepository.findAll();
  }

  async create(data: PromotionDTO) {
    return await this.promotionRepository.create(data);
  }

  async delete(id: number): Promise<boolean | any> {
    return await this.promotionRepository.delete(id);
  }

  async update(data: any): Promise<PromotionDTO | any> {
    return await this.promotionRepository.update(data);
  }
}
