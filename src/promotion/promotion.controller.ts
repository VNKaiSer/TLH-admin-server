import { Respone } from '@app/common/common.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PromotionService } from './promotion.service';
import { PromotionDTO } from './dto/promotion.dto';
import { CodeDTO } from './dto/code.dto';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all promotion',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getAllPromotion(): Promise<Respone> {
    return this.promotionService
      .getAll()
      .then((data) => {
        return {
          success: true,
          message: 'Lấy danh sách chương trình khuyến mãi thành công',
          status: HttpStatus.OK,
          data: data,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: '500 - Internal server error',
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Post()
  @ApiBody({
    type: PromotionDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Create promotion successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async createPromotion(
    @Body()
    data: PromotionDTO,
  ): Promise<Respone> {
    return this.promotionService
      .create(data)
      .then(() => {
        return {
          success: true,
          message: 'Tạo chương trình khuyến mãi thành công',
          status: HttpStatus.CREATED,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: '500 - Internal server error',
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Delete(':id')
  @ApiProperty({
    type: Number,
    name: 'id',
    description: 'ID chương trình khuyến mái',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete promotion successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async deletePromotion(@Param('id') id: number): Promise<Respone | any> {
    return this.promotionService
      .delete(id)
      .then(() => {
        return {
          success: true,
          message: 'Chương trình khuyến mãi thành công',
          status: HttpStatus.ACCEPTED,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Post('code')
  @ApiResponse({
    status: 200,
    description: 'Create code successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 400,
    description: 'Create code failed',
  })
  @ApiBody({
    type: CodeDTO,
  })
  async createCode(@Body() data: CodeDTO): Promise<Respone> {
    return this.promotionService
      .createCode(data)
      .then((result) => {
        return {
          success: true,
          message: 'Tạo code thành công',
          status: HttpStatus.CREATED,
          data: result,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Get('code')
  @ApiResponse({
    status: 200,
    description: 'Get all code',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getAllCode(): Promise<Respone> {
    return this.promotionService
      .getAllCode()
      .then((result) => {
        return {
          success: true,
          message: 'Danh sách code',
          status: HttpStatus.OK,
          data: result,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }
}
