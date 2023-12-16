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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { EmployeeDB } from './dto/db/employee.db';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmp(): Promise<Respone> {
    return this.employeeService
      .getAll()
      .then((result) => {
        const sanitizedResult = result.map(
          (employee: { [x: string]: any; passwordHash: any }) => {
            const { passwordHash, ...rest } = employee;
            return rest;
          },
        );
        return {
          success: true,
          message: 'Lấy danh sách nhân viên thành công',
          status: HttpStatus.OK,
          data: sanitizedResult,
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

  @Post()
  async createEmployee(
    @Body()
    data: EmployeeDB,
  ): Promise<Respone> {
    const cusExist = await this.employeeService.isExisting(data.phone);
    if (cusExist) {
      return {
        success: false,
        message: 'Nhân viên đã tồn tại',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    return this.employeeService
      .create(data)
      .then(() => {
        return {
          success: true,
          message: 'Tạo nhân viên thành công',
          status: HttpStatus.CREATED,
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

  @Delete(':phone')
  async deleteCustomer(@Param('phone') phone: string): Promise<Respone> {
    const cus = await this.employeeService.isExisting(phone);
    if (!cus) {
      return {
        success: false,
        message: 'Không tìm thấy nhân viên',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return this.employeeService
      .delete(phone)
      .then(() => {
        return {
          success: true,
          message: 'Xóa nhân viên thành công',
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
  @ApiResponse({
    status: 200,
    description: 'Cập nhật nhân viên',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhân viên',
  })
  @ApiBody({ type: EmployeeDB })
  async updateCus(
    @Param('phone') phone: string,
    @Body() data: any,
  ): Promise<Respone> {
    const customer = await this.employeeService.isExisting(phone);
    if (!customer) {
      return {
        success: false,
        message: 'Không tìm thấy nhân viên',
        status: HttpStatus.NOT_FOUND,
      };
    }
    const updatedCus = await this.employeeService.update(phone, data);
    return {
      success: true,
      message: 'Cập nhật nhân viên thành công',
      status: HttpStatus.ACCEPTED,
      data: updatedCus,
    };
  }

  @Get(':phone')
  @ApiResponse({
    status: 200,
    description: 'Tìm thấy nhân viên',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhân viên',
  })
  async getEmployee(@Param('phone') phone: string): Promise<Respone> {
    const cus = await this.employeeService.isExisting(phone);
    if (!cus) {
      return {
        success: false,
        message: 'Không tìm thấy nhân viên',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: 'Lọc nhân viên',
      status: HttpStatus.OK,
      data: cus,
    };
  }
}
