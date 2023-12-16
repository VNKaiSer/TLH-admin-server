import { EmployeeService } from '@app/employee/employee.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async signIn(auth: AuthDTO) {
    const { phone, password } = auth;
    const user = await this.employeeService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.accountStatus === 'inactive') {
      throw new UnauthorizedException('User is inactive');
    }
    const payload = { sub: user, username: user.phone };
    delete user.passwordHash;
    delete user.passwordLevel2;
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
