import { timeStamp } from 'console';
import { AuthGuard } from '@app/auth/guard/auth.guard';
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
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Response } from 'express';
import { CustomerToDB } from './dto/customerToDB';
import { MembershipDTO } from './dto/membership.dto';
import { ActiveMemberDTO } from './dto/member.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          title: 'Số điện thoại khách hàng',
        },
        name: {
          type: 'string',
          title: 'Tên khách hàng',
        },
        avt: {
          type: 'string',
          title: 'Hình ảnh khách hàng',
        },
      },
    },
  })
  async createCus(
    @Body()
    data: CustomerToDB,
    @Res() res: Response,
  ) {
    const cusExist = await this.customerService.isExisting(data.phone);
    if (cusExist) {
      return res.send({
        success: false,
        message: 'Khách hàng đã tồn tại',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    this.customerService
      .register(data)
      .then(() => {
        return res.send({
          success: true,
          message: 'Đăng ký thành công',
          status: HttpStatus.CREATED,
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        });
      });
  }

  @Get()
  async getAllCus(): Promise<Respone> {
    return this.customerService
      .getAll()
      .then((result) => {
        return {
          success: true,
          message: 'Lấy danh khách hàng viên thành công',
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

  // @UseGuards(AuthGuard)
  @Delete(':phone')
  async deleteCustomer(@Param('phone') phone: string): Promise<Respone> {
    const cus = await this.customerService.isExisting(phone);
    if (!cus) {
      return {
        success: false,
        message: 'Không tìm thấy khách hàng',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return this.customerService
      .delete(phone)
      .then(() => {
        return {
          success: true,
          message: 'Xóa khách hàng thành công',
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

  @Put(':phone')
  // @UseGuards(AuthGuard)
  @ApiBody({
    schema: {
      type: 'object',

      properties: {
        name: {
          title: 'Tên khách hàng',
          type: 'string',
        },
        dob: {
          title: 'Ngày sinh khách hàng',
          type: 'string',
          format: 'date-time',
        },
        email: {
          title: 'Email khách hàng',
          type: 'string',
        },
      },
    },
  })
  async updateCus(
    @Param('phone') phone: string,
    @Body() data: any,
  ): Promise<Respone> {
    // const customer = await this.customerService.isExisting(phone);
    // if (!customer) {
    //   return {
    //     success: false,
    //     message: 'Không tìm thấy khách hàng',
    //     status: HttpStatus.NOT_FOUND,
    //   };
    // }

    const updatedCus = await this.customerService.update(phone, data);
    return {
      success: true,
      message: 'Cập nhật khách hàng thành công',
      status: HttpStatus.ACCEPTED,
      data: updatedCus,
    };
  }

  @Get(':phone')
  // @UseGuards(AuthGuard)
  async getCus(@Param('phone') phone: string): Promise<Respone> {
    const customer = await this.customerService.isExisting(phone);
    if (!customer) {
      return {
        success: false,
        message: 'Không tìm thấy khách hàng',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: 'Thông tin khách hàng ' + phone,
      status: HttpStatus.OK,
      data: {
        ...customer,
        dob: new Date(customer.dob).toISOString().slice(0, 10),
      },
    };
  }

  // @Put(':phone/membership')
  // @ApiBody({
  //   type: MembershipDTO,
  // })
  // @ApiProperty({
  //   name: 'phone',
  //   type: 'string',
  //   description: 'Số điện thoại',
  //   example: 'user.phone',
  // })
  // @ApiOperation({
  //   summary:
  //     'API này dùng cho cả 2 việc update và create điểm của thằng customer và việc tạo membership. \
  //      \n- Nếu khách hàng đã là membership cập nhật số điểm tích lũy, \
  //      \n- Nếu khách hàng chưa membership thì tạo mới',
  //   parameters: [
  //     {
  //       name: 'phone',
  //       in: 'path',
  //       description: 'Số điện thoại',
  //     },
  //   ],
  //   requestBody: {
  //     required: true,
  //     content: {
  //       'application/json': {},
  //     },
  //   },
  // })
  // // @UseGuards(AuthGuard)
  // async updateCusMembership(
  //   @Param('phone') phone: string,
  //   @Body() data: MembershipDTO,
  // ): Promise<Respone | any> {
  //   return this.customerService
  //     .updateMembership(phone, data)
  //     .then((result) => {
  //       return {
  //         success: true,
  //         message: 'Tích điểm khách hàng thành công',
  //         status: HttpStatus.ACCEPTED,
  //         data: result,
  //       };
  //     })
  //     .catch((err) => {
  //       return {
  //         success: false,
  //         message: err.message,
  //         status: HttpStatus.BAD_REQUEST,
  //       };
  //     });
  // }

  @Post(':phone/membership')
  @ApiBody({
    type: ActiveMemberDTO,
  })
  @ApiOperation({
    summary: 'API tạo membership cho khách hàng ',
  })
  @ApiProperty({
    name: 'phone',
    type: 'string',
    description: 'Số điện thoại khách hàng đăng kí thành viên',
    example: 'user.phone',
  })
  public async createMembership(
    @Param('phone') phone: string,
    @Body() data: ActiveMemberDTO,
  ) {
    return this.customerService
      .createMembership(phone, data)
      .then((result) => {
        return {
          success: true,
          message: 'Tạo membership cho khách hàng ' + phone,
          status: HttpStatus.ACCEPTED,
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
