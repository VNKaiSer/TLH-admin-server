import { HttpExceptionCustom } from '@app/common/common.exception';
import { CustomerCheck } from '@app/customer/customer.check';
import { CustomerService } from '@app/customer/customer.service';
import {
  CanActivate,
  Inject,
  HttpStatus,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(CustomerCheck) private customerCheck: CustomerCheck,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const tokenString = request.headers.authorization;

    const token = this.customerCheck.isTokenExist(!!tokenString);

    try {
      // const user = await this.customerService.getUserByToken(tokenString);
      // console.log('user', user);
      return true;
    } catch (error) {
      throw new HttpExceptionCustom(
        'Token expired or incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
