import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { customers } from '@prisma/client';
import { EmployeeDB } from './dto/db/employee.db';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async findByPhone(phone: string): Promise<customers | any> {
    return await this.employeeRepository.findByPhone(phone);
  }

  async getAll(): Promise<customers[] | any> {
    return await this.employeeRepository.findAll();
  }

  async create(data: EmployeeDB) {
    return await this.employeeRepository.create(data);
  }

  async delete(phone: string): Promise<boolean | any> {
    return await this.employeeRepository.delete(phone);
  }

  async update(phone: string, data: any): Promise<customers | any> {
    return await this.employeeRepository.update(phone, data);
  }

  async isExisting(phone: string) {
    return await this.employeeRepository.findByPhone(phone);
  }
}
