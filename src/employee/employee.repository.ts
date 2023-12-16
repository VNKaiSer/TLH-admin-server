import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { employees } from '@prisma/client';
import { EmployeeDB } from './dto/db/employee.db';
import { genSaltSync, hashSync } from 'bcrypt';
@Injectable()
export class EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.employees.findMany({
      // select: {
      //   passwordHash: false,
      //   address: true,
      //   role: true,
      // },
      include: {
        address: true,
        role: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.employees.findUnique({
      where: { id },
    });
  }

  async create(data: EmployeeDB) {
    const address = data.address;
    const addAddress = await this.prisma.address.create({
      data: {
        ...address,
      },
    });
    const address_id = addAddress.id;

    if (!addAddress) return Error('500 Internal Server Error');
    const passwordHash = this.createPasswordHash(data.passwordHash);

    return this.prisma.employees.create({
      data: {
        avt: data.avt,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address_id: address_id,
        dob: data.dob,
        passwordHash: passwordHash,
        role_id: data.role_id,
      },
    });
  }

  /**
   * Find a user record by phone number.
   *
   * @param {string} phone - The phone number of the user.
   * @return {Promise<users>} The user record.
   */
  async findByPhone(phone: string): Promise<employees | any> {
    return this.prisma.employees.findUnique({
      where: { phone },
    });
  }

  async delete(phone: string): Promise<boolean | any> {
    return this.prisma.employees.update({
      where: { phone },
      data: {
        isActived: false,
      },
    });
  }

  async update(phone: string, data: any): Promise<employees | any> {
    return this.prisma.employees.update({
      where: { phone },
      data,
    });
  }

  createPasswordHash(string: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(string, salt);
    return hash;
  }
}
