import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpExceptionCustom } from 'src/common/common.exception';

@Injectable()
export class CustomerCheck {
  isExistCustomer(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom('Customer not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  isUniqueCustomer(bool: boolean): boolean {
    if (bool) {
      throw new HttpExceptionCustom(
        'Email or name are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return true;
  }

  isValidPassword(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'Password is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isNotExistBothPassword(bool: boolean): boolean {
    if (bool) {
      throw new HttpExceptionCustom(
        'New password and old password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isTokenExist(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  isNotEmptyUpdate(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'At least one field must be filled',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return true;
  }
}
